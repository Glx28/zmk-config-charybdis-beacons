# Coach layer beacon

Coach follows the keyboard's selected endpoint. Over USB, firmware sends layer state through a second vendor-defined HID interface (`HID_1`); the normal keyboard and mouse reports remain on `HID_0`. The Windows helper reads the vendor reports with Raw Input. They cannot trigger shortcuts or dismiss taskbar previews. Over BLE, firmware uses the private GATT notification as before.

## Shared payload

- Payload: five bytes `[0x43, version=1, layer, kind, pressed]`
- `kind`: `0` held layer, `1` toggle, `2` locked layer, `3` return to base
- `pressed`: `1` enters/sets; `0` releases a held layer

## USB transport

- Vendor usage page: `0xFF00`, usage `1`
- Report ID: `1`; five-byte payload follows report ID
- Windows helper subscribes to this raw HID collection; no browser pairing or BLE connection needed
- USB side channel exists on the split central only and is enabled by `CONFIG_USB_HID_DEVICE_COUNT=2`

## BLE transport

- Service UUID: `3f9e4e20-50c4-4b43-a789-8a982318e9a0`
- Notification characteristic: `3f9e4e21-50c4-4b43-a789-8a982318e9a0`
- Open Coach in Edge or Chrome and use **Connect over Bluetooth** when the selected keyboard endpoint is BLE
- The private Coach page forwards validated notifications to the helper over loopback HTTP

Scroll holds use a state-aware layer behavior: it adds L11 and its target while held, then only removes layers it added. If the target was already active (for example L10), releasing the scroll key leaves it active.

## Firmware

The GitHub Actions build includes `config/modules/coach_beacon`. Use the `charybdis_right` artifact, because the right shield is this config's split central. Build left firmware too when installing the complete matching pair. The standard keyboard HID collection is unchanged; the vendor interface is additive.

## Windows Coach

Run `portable-charybdis` on each USB host. Cable use is automatic; no Bluetooth pairing is needed for Coach. Use **Connect over Bluetooth** only when the keyboard's selected output endpoint is BLE.
