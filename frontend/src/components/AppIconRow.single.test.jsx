// @vitest-environment happy-dom
// URQENIX has one app icon, so Settings has nothing to offer: no row, however able the phone is.
import React, { act } from 'react'
import { createRoot } from 'react-dom/client'
import { afterEach, beforeEach, expect, it, vi } from 'vitest'
import { APP_ICON_IDS } from '../lib/app-icon-variants.js'
import AppIconRow from './AppIconRow.jsx'

globalThis.IS_REACT_ACT_ENVIRONMENT = true

vi.mock('../lib/mobile.js', () => ({ MOBILE: true }))
vi.mock('../store/useUI.js', () => ({ useUI: { getState: () => ({ toast: vi.fn() }) } }))
vi.mock('@capacitor/core', () => ({
  registerPlugin: () => ({ getIcon: async () => ({ supported: true, name: 'default' }) }),
}))

let host, root
beforeEach(() => {
  globalThis.Capacitor = { getPlatform: () => 'ios' }
  host = document.createElement('div')
  root = createRoot(host)
})
afterEach(() => { act(() => root.unmount()); delete globalThis.Capacitor })

it('with only the one icon, the row is not there', async () => {
  expect(APP_ICON_IDS).toEqual(['default'])
  await act(async () => { root.render(<AppIconRow />) })
  await act(async () => { for (let i = 0; i < 4; i++) await Promise.resolve() })
  expect(host.innerHTML).toBe('')
})
