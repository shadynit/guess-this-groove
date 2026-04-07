import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const PrivacyPolicy = () => (
  <div className="min-h-screen bg-background text-foreground p-6 max-w-2xl mx-auto">
    <Link to="/" className="inline-flex items-center gap-2 text-accent hover:underline mb-6">
      <ArrowLeft className="w-4 h-4" /> Back
    </Link>
    <h1 className="text-3xl font-display font-bold mb-2">Privacy Policy</h1>
    <p className="text-sm text-muted-foreground mb-6">Last updated: April 2026</p>

    <div className="space-y-4 text-sm leading-relaxed">
      <p>
        WordRush (<a href="https://wordrush.fun" className="text-accent hover:underline">wordrush.fun</a>) does not collect any personal information from users.
      </p>
      <p>We only collect limited, non-personal data such as:</p>
      <ul className="list-disc pl-6 space-y-1">
        <li>Total number of times the game is played globally</li>
        <li>Anonymous usage data for performance</li>
      </ul>
      <p>This data cannot identify any individual user.</p>
      <p>
        We may use tools like Google Analytics to understand general usage trends. These tools collect only anonymized data.
      </p>
      <p>WordRush includes an optional Adult Mode intended for users aged 18 and above.</p>
      <p>
        For questions, contact: <a href="mailto:mail@nitesh.co.in" className="text-accent hover:underline">mail@nitesh.co.in</a>
      </p>
    </div>
  </div>
);

export default PrivacyPolicy;
