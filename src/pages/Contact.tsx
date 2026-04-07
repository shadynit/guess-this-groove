import { Link } from "react-router-dom";
import { ArrowLeft, Mail, Globe } from "lucide-react";

const Contact = () => (
  <div className="min-h-screen bg-background text-foreground p-6 max-w-2xl mx-auto">
    <Link to="/" className="inline-flex items-center gap-2 text-accent hover:underline mb-6">
      <ArrowLeft className="w-4 h-4" /> Back
    </Link>
    <h1 className="text-3xl font-display font-bold mb-2">Contact</h1>

    <div className="space-y-4 text-sm leading-relaxed mt-6">
      <p>For any queries or support:</p>
      <div className="flex items-center gap-2">
        <Mail className="w-4 h-4 text-accent" />
        <a href="mailto:mail@nitesh.co.in" className="text-accent hover:underline">mail@nitesh.co.in</a>
      </div>
      <div className="flex items-center gap-2">
        <Globe className="w-4 h-4 text-accent" />
        <a href="https://wordrush.fun" className="text-accent hover:underline" target="_blank" rel="noopener noreferrer">wordrush.fun</a>
      </div>
    </div>
  </div>
);

export default Contact;
