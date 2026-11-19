# PMW3610 input retention and queue stalls

## Confirmed cause

The repository pins `badjeff/zmk-pmw3610-driver` at `5c5af40de4d8cdf55dc63c4c5907af1e52da6a95` in `config/west.yml`. In that revision, `src/pmw3610.c`'s `pmw3610_report_data()` accumulated sensor deltas, copied them into report values, then cleared both accumulators before submitting X and Y separately with `K_NO_WAIT`. It ignored both `input_report()` return values.

When Zephyr's input queue was full, an axis event could be rejected after its counts had already been erased. The loss was silent. Since X and Y are separate queue events, losing one can distort diagonal or curved movement; losing successive events can look like a pause or freeze. This was a confirmed code defect.

The first fix changed the enqueue timeout to `K_FOREVER` and retained each axis until accepted. That prevented loss, but introduced a second risk: the call runs from the PMW3610 GPIO work callback, while that callback's caller has disabled the sensor interrupt. A full Zephyr input queue could therefore block the callback and delay both interrupt re-enable and the next sensor read. This is a confirmed blocking path and a likely contributor to the remaining long gaps. The Windows Raw Input capture showed gaps up to 248 ms, but it is downstream of firmware and cannot prove the queue filled during those exact gaps.

## Permanent fix

`patches/pmw3610-lossless-input-reporting.patch` changes the driver to:

- Keep pending X/Y movement in per-device driver state.
- Attempt queue writes with `K_NO_WAIT`; subtract an axis only after its event is accepted.
- On queue pressure, schedule a 1 ms delayed retry and return immediately, allowing the GPIO work callback to re-enable the sensor interrupt.
- Retain unsent movement across retries, including any remainder above the HID event's signed 16-bit range.
- Preserve the configured minimum report interval without purging pending movement.

This is nonblocking, lossless retry. It removes sensor-workqueue backpressure while retaining deltas. If the consumer remains slower than the producer for a sustained period, movement can still be delivered late in a batch; the retry does not increase downstream throughput.

The right-half GitHub Actions build applies this patch immediately after `west update`. West checks this project out at the workspace root as `zmk-pmw3610-driver` (not under `modules/`). Because the patch is pinned to the configured driver revision, a driver update or changed source context makes CI fail at the patch step instead of silently dropping the fix. Keep the west pin and patch aligned.

`CONFIG_INPUT_THREAD_PRIORITY=-2` and `CONFIG_INPUT_QUEUE_MAX_MSGS=128` in `charybdis_right.conf` help the consumer drain bursts. They are supporting capacity settings, not substitutes for retaining deltas or keeping the sensor work callback nonblocking.

## Regression rule

Never clear pending `dx`/`dy` before queue acceptance. Never use `K_FOREVER` from the PMW3610 sensor work callback: it runs before the sensor interrupt is re-enabled. Any nonblocking design must preserve and retry rejected movement per axis. Keep the driver patch in the right-half CI path and verify that step passes before flashing.

## Validation and current profile

The first patched right-half firmware built successfully in GitHub Actions run [44595272729](https://github.com/Glx28/zmk-config-charybdis-beacons/actions/runs/44595272729), and the user reported substantially smoother tracking afterward, with some longer freezes still observed. The same blocking lossless patch is also present in later profile build [44602209493](https://github.com/Glx28/zmk-config-charybdis-beacons/actions/runs/44602209493). This revision replaces that blocking enqueue with asynchronous retry. The final device-side effect still needs a short movement check after flashing; host Raw Input cannot isolate all upstream causes by itself.

Current cursor/scroll gains are defined in `config/charybdis.keymap`; sensor, rest, and queue settings are in `config/boards/shields/charybdis/charybdis_right.conf` and `.overlay`. Read those files before changing or describing the profile. Do not copy old tuning values from this document.
