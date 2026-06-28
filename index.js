(function(exports, metro, common, lazy, api, plugin) {
  "use strict";

  let originalDescriptors = [];

  function overrideGetter(target, key, value) {
    if (!target) return;

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
      console.log("[PC Device Spoofer] Failed to override " + key, err);
    }
  }

  function onLoad() {
    console.log("[PC Device Spoofer] Loaded");

    const nav = typeof navigator !== "undefined" ? navigator : null;
    const scr = typeof screen !== "undefined" ? screen : null;

    if (nav) {
      overrideGetter(nav, "userAgent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36");
      overrideGetter(nav, "platform", "Win32");
      overrideGetter(nav, "hardwareConcurrency", 8);
      overrideGetter(nav, "maxTouchPoints", 0);
      overrideGetter(nav, "vendor", "Google Inc.");
    }

    if (scr) {
      overrideGetter(scr, "width", 1920);
      overrideGetter(scr, "height", 1080);
      overrideGetter(scr, "availWidth", 1920);
      overrideGetter(scr, "availHeight", 1040);
    }
  }

  function onUnload() {
    console.log("[PC Device Spoofer] Unloaded");

    for (const item of originalDescriptors.reverse()) {
      try {
        if (item.original) {
          Object.defineProperty(item.target, item.key, item.original);
        } else {
          delete item.target[item.key];
        }
      } catch (err) {
        console.log("[PC Device Spoofer] Failed to restore " + item.key, err);
      }
    }

    originalDescriptors = [];
  }

  const index = {
    onLoad,
    onUnload
  };

  exports.default = index;
  Object.defineProperty(exports, "__esModule", { value: true });

  return exports;
})({}, bunny.metro, bunny.metro.common, bunny.utils.lazy, bunny.api, vendetta.plugin);
