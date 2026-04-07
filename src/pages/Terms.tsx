import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowLeft } from "lucide-react";

const Terms = () => (
  <div className="min-h-screen bg-background text-foreground p-6 max-w-2xl mx-auto">
    <Helmet>
      <title>Terms & Conditions - Word Rush | wordrush.fun</title>
      <meta name="description" content="Terms and conditions for using Word Rush party word game. Entertainment use, adult mode policy, and usage guidelines." />
      <link rel="canonical" href="https://wordrush.fun/terms" />
      <meta property="og:title" content="Terms & Conditions - Word Rush" />
      <meta property="og:description" content="Terms and conditions for Word Rush. Entertainment use only." />
      <meta property="og:url" content="https://wordrush.fun/terms" />
    </Helmet>

    <Link to="/" className="inline-flex items-center gap-2 text-accent hover:underline mb-6">
      <ArrowLeft className="w-4 h-4" /> Back
    </Link>
    <h1 className="text-3xl font-display font-bold mb-2">Terms &amp; Conditions</h1>

    <div className="space-y-4 text-sm leading-relaxed mt-6">
      <p>By using WordRush, you agree:</p>
      <ul className="list-disc pl-6 space-y-1">
        <li>The game is for entertainment purposes only</li>
        <li>No guarantee of uptime or error-free experience</li>
        <li>Users must not misuse or disrupt the service</li>
        <li>Adult Mode is intended for 18+ users</li>
        <li>The creator is not liable for damages or interruptions</li>
      </ul>
      <p>All content and code belong to WordRush and may not be reused without permission.</p>
      <p>
        Contact: <a href="mailto:mail@nitesh.co.in" className="text-accent hover:underline">mail@nitesh.co.in</a>
      </p>
    </div>
  </div>
);

export default Terms;
