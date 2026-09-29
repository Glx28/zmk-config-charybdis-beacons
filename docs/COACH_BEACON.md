# Coach BLE beacon

Layer state reaches Coach through a private BLE GATT notification, not keyboard HID. This keeps layer changes out of Windows keyboard input and preserves taskbar previews.

## Protocol

- Service UUID: `3f9e4e20-50c4-4b43-a789-8a982318e9a0`
- Notification characteristic: `3f9e4e21-50c4-4b43-a789-8a982318e9a0`
- Payload: five bytes `[0x43, version=1, layer, kind, pressed]`
- `kind`: `0` held layer, `1` toggle, `2` locked layer, `3` return to base
- `pressed`: `1` enters/sets; `0` releases a held layer

The service exists on the split central only. Private local Coach pages subscribe to notifications and forward validated events to the local helper over loopback HTTP.

Scroll holds use a state-aware layer behavior: it adds L11 and its target while held, then only removes layers it added. If the target was already active (for example L10), releasing the scroll key leaves it active.

## Firmware

The GitHub Actions build includes `config/modules/coach_beacon`. Use the `charybdis_right` artifact, because the right shield is this config's split central. Build left firmware too when installing the complete matching pair. No keyboard HID report descriptor changes, so BLE re-pairing is not required.

## Windows Coach

Run `portable-charybdis`, open Coach in Edge or Chrome, and click **Connect keyboard** once. Browser permission is stored for that Coach origin and reused on later launches. Keep the Coach page open while using the keyboard; it relays GATT notifications to the desktop helper.
