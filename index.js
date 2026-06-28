module.exports = {
    // Plugin metadata
    name: "PC Device Spoofer",
    description: "Spoofs mobile device to appear as PC",
    authors: ["yourname"],
    
    // Main plugin code
    start() {
        // Override navigator.userAgent
        Object.defineProperty(navigator, 'userAgent', {
            get: () => "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
        });
        
        // Override navigator.platform
        Object.defineProperty(navigator, 'platform', {
            get: () => "Win32"
        });
        
        // Override navigator.hardwareConcurrency to a typical PC value
        Object.defineProperty(navigator, 'hardwareConcurrency', {
            get: () => 8
        });
        
        // Override navigator.deviceMemory to a typical PC value
        Object.defineProperty(navigator, 'deviceMemory', {
            get: () => 8
        });
        
        // Override navigator.maxTouchPoints to 0 (PC typically has no touch points)
        Object.defineProperty(navigator, 'maxTouchPoints', {
            get: () => 0
        });
        
        // Override screen dimensions to typical desktop resolution
        Object.defineProperty(screen, 'width', {
            get: () => 1920
        });
        
        Object.defineProperty(screen, 'height', {
            get: () => 1080
        });
        
        // Override window.orientation to undefined (PCs don't have orientation)
        Object.defineProperty(window, 'orientation', {
            get: () => undefined
        });
        
        // Override touch events support
        Object.defineProperty(navigator, 'ontouchstart', {
            get: () => undefined
        });
        
        // Override vendor to match Windows PC
        Object.defineProperty(navigator, 'vendor', {
            get: () => "Google Inc."
        });
        
        // Override device detection methods
        Object.defineProperty(navigator, 'vendorSub', {
            get: () => ""
        });
        
        // Override connection properties to match desktop
        if (navigator.connection) {
            Object.defineProperty(navigator.connection, 'effectiveType', {
                get: () => "4g"
            });
        }
    },
    
    stop() {
        // Restore original values if needed
        // Implementation depends on how you want to handle this
    }
};
