/*
ZMK Studio ComboBox key name exporter.

Usage:
1. Open https://zmk.studio/ and connect the keyboard.
2. Navigate to any key that has a "Key Press" behavior (e.g. Layer 0, key 0,0).
3. Click on the key so the behavior editor panel opens with the Key combobox visible.
4. Open DevTools > Console.
5. Paste this script and press Enter.
6. It opens the combobox dropdown, scrapes ALL available option names, closes it,
   and downloads a JSON file with the complete list.

This list is the definitive set of valid values for the "parameter" field
in apply_every_key.js when behavior is "Key Press".
*/

(async function exportComboboxOptions() {
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  const input = document.querySelector('[role="combobox"]');
  if (!input) {
    console.error('No combobox found. Make sure a Key Press key is selected in the editor panel.');
    return;
  }

  input.focus();
  const nativeSet = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value').set;
  nativeSet.call(input, '');
  input.dispatchEvent(new InputEvent('input', { bubbles: true, inputType: 'deleteContentBackward' }));
  await sleep(300);

  const comboButton = input.closest('.react-aria-ComboBox')?.querySelector('button')
    || input.parentElement?.querySelector('button');
  if (comboButton && comboButton.getAttribute('aria-expanded') !== 'true') {
    comboButton.click();
    await sleep(500);
  }

  const allOptions = new Set();
  let lastCount = 0;
  let scrollAttempts = 0;

  const listboxId = input.getAttribute('aria-controls');
  const listbox = listboxId ? document.getElementById(listboxId)
    : document.querySelector('[role="listbox"]:not([aria-label="Keymap Layer"])');

  if (!listbox) {
    console.error('No listbox found. Try clicking the dropdown arrow button first.');
    return;
  }

  function scrapeVisible() {
    const options = listbox.querySelectorAll('[role="option"]');
    options.forEach(opt => {
      const text = (opt.textContent || '').trim();
      if (text && text.length < 120) allOptions.add(text);
    });
  }

  scrapeVisible();
  console.log(`Initial scrape: ${allOptions.size} options`);

  // Scroll through the listbox to load all virtualized options
  const scrollable = listbox.closest('[style*="overflow"]') || listbox;
  const maxScrollAttempts = 200;

  while (scrollAttempts < maxScrollAttempts) {
    scrollable.scrollTop += 500;
    await sleep(80);
    scrapeVisible();

    if (allOptions.size === lastCount) {
      scrollAttempts++;
      if (scrollAttempts > 5) break;
    } else {
      scrollAttempts = 0;
      lastCount = allOptions.size;
    }
  }

  // Also try scrolling back up to catch anything missed
  scrollable.scrollTop = 0;
  await sleep(200);
  scrapeVisible();

  // Try alphabetic search to catch any options not in the scroll range
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  for (const char of alphabet) {
    nativeSet.call(input, char);
    input.dispatchEvent(new InputEvent('input', { bubbles: true, inputType: 'insertText', data: char }));
    await sleep(200);
    scrapeVisible();
  }

  // Clear and close
  nativeSet.call(input, '');
  input.dispatchEvent(new InputEvent('input', { bubbles: true, inputType: 'deleteContentBackward' }));
  await sleep(100);
  input.blur();

  const sorted = [...allOptions].sort();
  console.log(`Total unique options found: ${sorted.length}`);
  console.log('Options:', sorted);

  // Download as JSON
  const blob = new Blob([JSON.stringify({ exportedAt: new Date().toISOString(), count: sorted.length, options: sorted }, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `zmk-studio-key-options-${new Date().toISOString().replace(/[:.]/g, '-')}.json`;
  a.click();
  URL.revokeObjectURL(url);

  console.log('Downloaded! Paste the JSON contents into scripts/zmk-studio/zmk_studio_key_names.json');
  return sorted;
})();
