(function(exports, metro, common, lazy, api, plugin) {
  "use strict";

  let unpatches = [];

  function safeStore(name) {
    try {
      return metro.findByStoreName?.(name) || metro.findByStoreNameLazy?.(name);
    } catch {
      return null;
    }
  }

  function getStatus(realSessions) {
    try {
      const first = Object.values(realSessions || {})[0];
      return first?.status || "online";
    } catch {
      return "online";
    }
  }

  function makeDesktopSession(realSessions) {
    const base = (() => {
      try {
        return Object.values(realSessions || {})[0] || {};
      } catch {
        return {};
      }
    })();

    return {
      desktop: {
        ...base,
        sessionId: "desktop",
        status: getStatus(realSessions),
        clientInfo: {
          ...(base.clientInfo || {}),
          client: "desktop",
          os: "Windows"
        }
      }
    };
  }

  function onLoad() {
    console.log("[PC Device Spoofer] Loaded");

    const SessionsStore = safeStore("SessionsStore");

    if (SessionsStore?.getSessions) {
      unpatches.push(
        api.patcher.instead("getSessions", SessionsStore, (args, original) => {
          const realSessions = original(...args);
          return makeDesktopSession(realSessions);
        })
      );
    }

    try {
      SessionsStore?.emitChange?.();
    } catch {}

    console.log("[PC Device Spoofer] Patched local SessionsStore to desktop");
  }

  function onUnload() {
    console.log("[PC Device Spoofer] Unloaded");

    for (const unpatch of unpatches) {
      try {
        unpatch();
      } catch {}
    }

    unpatches = [];
  }

  const index = {
    onLoad,
    onUnload
  };

  exports.default = index;
  Object.defineProperty(exports, "__esModule", { value: true });

  return exports;
})({}, bunny.metro, bunny.metro.common, bunny.utils.lazy, bunny.api, vendetta.plugin);
