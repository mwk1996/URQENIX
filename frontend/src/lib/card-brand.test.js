import { afterEach, describe, expect, it, vi } from 'vitest'
import { drawBrand, setBrandLogo } from './card-draw.js'

const colors = { label: '#fff', label2: '#999', acc: '#f80' }
function fakeCtx() {
  return {
    images: [], texts: [],
    drawImage(image, x, y, w, h) { this.images.push({ image, x, y, w, h }) },
    fillText(text, x) { this.texts.push({ text, x }) },
    measureText: text => ({ width: text.length * 10 }),
  }
}
const draw = ctx => drawBrand(ctx, { x: 100, y: 500, width: 800, colors, family: 'sans-serif' })

describe('the brand in a card footer', () => {
  afterEach(() => { setBrandLogo(null); vi.resetModules(); vi.unstubAllGlobals() })

  it('draws the logo as a square, with the name after it', () => {
    const logo = {}
    setBrandLogo(logo)
    const ctx = fakeCtx()
    draw(ctx)
    expect(ctx.images).toHaveLength(1)
    expect(ctx.images[0]).toMatchObject({ image: logo, x: 100 })
    expect(ctx.images[0].w).toBe(ctx.images[0].h)
    expect(ctx.texts[0].text).toBe('URQ')
    expect(ctx.texts[0].x).toBeGreaterThan(100 + ctx.images[0].w)
    expect(ctx.texts[1].text).toBe('ENIX')
  })

  it('still has the name when the logo is not there', () => {
    const ctx = fakeCtx()
    draw(ctx)
    expect(ctx.images).toHaveLength(0)
    expect(ctx.texts[0]).toMatchObject({ text: 'URQ', x: 100 })
  })

  it('a logo that fails to load never holds up the card, and is tried again next time', async () => {
    const made = []
    vi.stubGlobal('Image', class {
      constructor() { made.push(this) }
      set src(_) { queueMicrotask(() => this.onerror()) }
    })
    const { loadBrandLogo } = await import('./share-image.js')
    await loadBrandLogo()
    await loadBrandLogo()
    expect(made).toHaveLength(2)
  })

  it('a logo that never answers only holds up the card until the wait is over', async () => {
    vi.stubGlobal('Image', class { set src(_) { /* no answer */ } })
    const { loadBrandLogo } = await import('./share-image.js')
    await expect(loadBrandLogo('icon-180.png', 5)).resolves.toBeUndefined()
  })
})
