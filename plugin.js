const originalDescriptors = [];

function overrideGetter(target, key, value) {
  try {
    const original = Object.getOwnPropertyDescriptor(target, key);

    originalDescriptors.push({
      target,
      key,
      original
    });

    Object.defineProperty(target, key, {
      configurable: true,
      get: () => value
    });
  } catch (err) {
    console.log(`[PC Device Spoofer] Failed to override ${key}:`, err);
  }
}

export const onLoad = () => {
  console.log("[PC Device Spoofer] Loaded");

  overrideGetter(Navigator.prototype, "userAgent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36");
  overrideGetter(Navigator.prototype, "platform", "Win32");
  overrideGetter(Navigator.prototype, "hardwareConcurrency", 8);
  overrideGetter(Navigator.prototype, "maxTouchPoints", 0);
  overrideGetter(Navigator.prototype, "vendor", "Google Inc.");

  if ("screen" in window) {
    overrideGetter(Screen.prototype, "width", 1920);
    overrideGetter(Screen.prototype, "height", 1080);
    overrideGetter(Screen.prototype, "availWidth", 1920);
    overrideGetter(Screen.prototype, "availHeight", 1040);
  }
};

export const onUnload = () => {
  console.log("[PC Device Spoofer] Unloaded");

  for (const item of originalDescriptors.reverse()) {
    try {
      if (item.original) {
        Object.defineProperty(item.target, item.key, item.original);
      } else {
        delete item.target[item.key];
      }
    } catch (err) {
      console.log(`[PC Device Spoofer] Failed to restore ${item.key}:`, err);
    }
  }

  originalDescriptors.length = 0;
};
