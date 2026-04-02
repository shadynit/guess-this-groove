import { Mail } from "lucide-react";

export default function FeedbackButton() {
  return (
    <a
      href="mailto:mail@nitesh.co.in?subject=Word Rush Feedback"
      className="fixed bottom-4 right-4 z-50 p-3 rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-all active:scale-95"
      aria-label="Send feedback via email"
    >
      <Mail className="w-5 h-5" />
    </a>
  );
}
