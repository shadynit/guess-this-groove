import { useState } from "react";
import { MessageSquare, Send, X } from "lucide-react";

const TELEGRAM_BOT_TOKEN = "8759779043:AAFCgj7nnEaioxdO1mwOVRqbxEUdXq6HXcQ";
const TELEGRAM_CHAT_ID = "1347080221";

export default function FeedbackDialog() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSend = async () => {
    if (!message.trim()) return;
    setSending(true);
    try {
      const text = `🎮 *Word Rush Feedback*\n\n👤 *From:* ${name.trim() || "Anonymous"}\n💬 *Message:* ${message.trim()}`;
      await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text,
          parse_mode: "Markdown",
        }),
      });
      setSent(true);
      setTimeout(() => {
        setOpen(false);
        setSent(false);
        setMessage("");
        setName("");
      }, 2000);
    } catch {
      alert("Failed to send feedback. Please try again.");
    } finally {
      setSending(false);
    }
  };

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-4 right-4 z-50 p-3 rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-all active:scale-95"
        aria-label="Send feedback"
      >
        <MessageSquare className="w-5 h-5" />
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/50 animate-in fade-in">
      <div className="bg-card border border-border rounded-xl w-full max-w-sm p-5 shadow-2xl animate-slide-up-fade">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-primary" />
            <h2 className="font-display font-semibold text-lg">Send Feedback</h2>
          </div>
          <button onClick={() => setOpen(false)} className="text-muted-foreground hover:text-foreground transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {sent ? (
          <div className="text-center py-6">
            <p className="text-2xl mb-2">✅</p>
            <p className="font-semibold text-foreground">Thank you!</p>
            <p className="text-sm text-muted-foreground">Your feedback has been sent.</p>
          </div>
        ) : (
          <>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name (optional)"
              className="w-full bg-muted rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/50 mb-3 placeholder:text-muted-foreground/60"
            />
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tell us what you think..."
              rows={4}
              className="w-full bg-muted rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/50 mb-4 resize-none placeholder:text-muted-foreground/60"
            />
            <button
              onClick={handleSend}
              disabled={!message.trim() || sending}
              className={`w-full py-2.5 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 transition-all active:scale-[0.97] ${
                message.trim() && !sending
                  ? "bg-primary text-primary-foreground shadow-md shadow-primary/25"
                  : "bg-muted text-muted-foreground cursor-not-allowed"
              }`}
            >
              <Send className="w-4 h-4" />
              {sending ? "Sending..." : "Send Feedback"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
