import { afterEach, describe, expect, it, vi } from 'vitest'
import { checkForUpdate, resetUpdateCheck } from './update.js'
import { UPDATE_REPO } from './update-source.js'

describe('update check with no repository set', () => {
  const originalFetch = globalThis.fetch
  afterEach(() => { globalThis.fetch = originalFetch; resetUpdateCheck() })

  // URQENIX has no releases of its own yet, so it must not read another project's.
  it.runIf(!UPDATE_REPO)('asks nobody and reports no update', async () => {
    globalThis.fetch = vi.fn()
    resetUpdateCheck()
    const info = await checkForUpdate()
    expect(globalThis.fetch).not.toHaveBeenCalled()
    expect(info).toMatchObject({ hasUpdate: false, apkUrl: null, hashUrl: null })
  })
})
