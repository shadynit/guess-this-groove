import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowLeft } from "lucide-react";

const About = () => (
  <div className="min-h-screen bg-background text-foreground p-6 max-w-2xl mx-auto">
    <Helmet>
      <title>About Word Rush - Fun Party Word Guessing Game | wordrush.fun</title>
      <meta name="description" content="Learn about Word Rush — a fast-paced party word guessing game with team gameplay, fun categories, optional adult mode, and offline support." />
      <link rel="canonical" href="https://wordrush.fun/about" />
      <meta property="og:title" content="About Word Rush" />
      <meta property="og:description" content="A fast-paced party word guessing game with teams, categories, and offline play." />
      <meta property="og:url" content="https://wordrush.fun/about" />
    </Helmet>

    <Link to="/" className="inline-flex items-center gap-2 text-accent hover:underline mb-6">
      <ArrowLeft className="w-4 h-4" /> Back
    </Link>
    <h1 className="text-3xl font-display font-bold mb-2">About WordRush</h1>

    <div className="space-y-4 text-sm leading-relaxed mt-6">
      <p>WordRush is a fast-paced word guessing game designed for fun, parties, and social play.</p>
      <p>Players describe words without saying them while teammates guess before time runs out.</p>

      <h2 className="text-lg font-display font-semibold pt-2">Features</h2>
      <ul className="list-disc pl-6 space-y-1">
        <li>Team-based gameplay</li>
        <li>Fun categories</li>
        <li>Optional adult mode</li>
        <li>Fast-paced rounds</li>
      </ul>
      <p>Built to bring laughter, competition, and energy to every game session.</p>
    </div>
  </div>
);

export default About;
