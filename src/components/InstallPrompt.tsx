import { useState, useEffect } from "react";
import { Download, X, Share, Plus, MoreVertical } from "lucide-react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [dismissed, setDismissed] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);
  const [platform, setPlatform] = useState<"ios" | "android" | "desktop" | "other">("other");
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };
    window.addEventListener("beforeinstallprompt", handler);

    const ua = window.navigator.userAgent.toLowerCase();
    const isIOS = /iphone|ipad|ipod/.test(ua) && !(window as any).MSStream;
    const isAndroid = /android/.test(ua);
    setPlatform(isIOS ? "ios" : isAndroid ? "android" : /mobi/.test(ua) ? "other" : "desktop");

    const standalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as any).standalone === true;
    setIsStandalone(standalone);

    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  if (isStandalone || dismissed) return null;

  const handleInstall = async () => {
    if (deferredPrompt) {
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === "accepted") setDeferredPrompt(null);
    } else {
      setShowInstructions(true);
    }
  };

  return (
    <>
      <div className="fixed bottom-4 left-4 right-4 z-50 animate-slide-up-fade">
        <div className="bg-card border border-primary/30 rounded-lg p-4 shadow-lg shadow-primary/10 flex items-center gap-3 max-w-md mx-auto">
          <Download className="w-5 h-5 text-primary shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-foreground">Install Word Rush</p>
            <p className="text-xs text-muted-foreground">Add to home screen for offline play</p>
          </div>
          <button
            onClick={handleInstall}
            className="bg-primary text-primary-foreground text-xs font-bold px-3 py-1.5 rounded-md shrink-0 active:scale-95 transition-all"
          >
            Install
          </button>
          <button
            onClick={() => setDismissed(true)}
            aria-label="Dismiss"
            className="text-muted-foreground hover:text-foreground transition-colors shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {showInstructions && (
        <div
          className="fixed inset-0 z-[60] bg-background/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setShowInstructions(false)}
        >
          <div
            className="bg-card border border-primary/30 rounded-lg p-6 max-w-md w-full shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-foreground">Install Word Rush</h2>
              <button
                onClick={() => setShowInstructions(false)}
                className="text-muted-foreground hover:text-foreground"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {platform === "ios" && (
              <ol className="space-y-3 text-sm text-foreground">
                <li className="flex items-start gap-2">
                  <span className="font-bold text-primary">1.</span>
                  <span>Tap the <Share className="inline w-4 h-4 mx-1" /> Share button in Safari's toolbar.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-primary">2.</span>
                  <span>Scroll down and tap <Plus className="inline w-4 h-4 mx-1" /> <b>Add to Home Screen</b>.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-primary">3.</span>
                  <span>Tap <b>Add</b> in the top-right corner.</span>
                </li>
              </ol>
            )}

            {platform === "android" && (
              <ol className="space-y-3 text-sm text-foreground">
                <li className="flex items-start gap-2">
                  <span className="font-bold text-primary">1.</span>
                  <span>Tap the <MoreVertical className="inline w-4 h-4 mx-1" /> menu in your browser.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-primary">2.</span>
                  <span>Tap <b>Install app</b> or <b>Add to Home Screen</b>.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-primary">3.</span>
                  <span>Confirm to install.</span>
                </li>
              </ol>
            )}

            {(platform === "desktop" || platform === "other") && (
              <ol className="space-y-3 text-sm text-foreground">
                <li className="flex items-start gap-2">
                  <span className="font-bold text-primary">1.</span>
                  <span>Look for the install icon in your browser's address bar.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-primary">2.</span>
                  <span>Or open the browser menu and choose <b>Install Word Rush</b> / <b>Add to Home Screen</b>.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-primary">3.</span>
                  <span>Once installed, launch it like any app to play offline.</span>
                </li>
              </ol>
            )}

            <p className="mt-4 text-xs text-muted-foreground">
              Works fully offline once installed.
            </p>
          </div>
        </div>
      )}
    </>
  );
}
