import { useState, useEffect, useCallback, useRef } from "react";
import { getRandomWord } from "@/lib/words";
import { GameState } from "@/lib/gameTypes";
import { Check, SkipForward } from "lucide-react";

interface GamePlayProps {
  game: GameState;
  onTurnEnd: (wordsGuessed: number) => void;
}

interface WordResult {
  word: string;
  guessed: boolean | null; // null = not yet answered
}

export default function GamePlay({ game, onTurnEnd }: GamePlayProps) {
  const [timeLeft, setTimeLeft] = useState<number>(game.roundTime);
  const [words] = useState<WordResult[]>(() =>
    Array.from({ length: game.wordsPerTurn }, () => ({
      word: getRandomWord(),
      guessed: null,
    }))
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [results, setResults] = useState<WordResult[]>([]);
  const [finished, setFinished] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval>>();
  const isTeamA = game.currentTeamIndex === 0;

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timerRef.current);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, []);

  // Time's up — mark remaining words as skipped and show summary
  useEffect(() => {
    if (timeLeft === 0 && !finished) {
      setFinished(true);
      clearInterval(timerRef.current);
      const finalResults = words.map((w, i) => {
        const existing = results.find((r) => r.word === w.word);
        if (existing) return existing;
        return { ...w, guessed: false };
      });
      setResults(finalResults);
      setShowSummary(true);
    }
  }, [timeLeft, finished, words, results]);

  const handleAnswer = (guessed: boolean) => {
    if (finished) return;
    const word = words[currentIndex];
    const newResults = [...results, { ...word, guessed }];
    setResults(newResults);

    const nextIndex = currentIndex + 1;
    if (nextIndex >= words.length) {
      // All words done
      setFinished(true);
      clearInterval(timerRef.current);
      setResults(newResults);
      setShowSummary(true);
    } else {
      setCurrentIndex(nextIndex);
    }
  };

  const handleContinue = () => {
    const score = results.filter((r) => r.guessed).length;
    onTurnEnd(score);
  };

  const progress = timeLeft / game.roundTime;
  const isUrgent = timeLeft <= 5;
  const circumference = 2 * Math.PI * 54;

  if (showSummary) {
    const score = results.filter((r) => r.guessed).length;
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4">
        <div className="w-full max-w-md text-center">
          <h2 className="text-3xl font-display font-bold mb-6">Round Summary</h2>
          <div className="space-y-3 mb-8">
            {results.map((r, i) => (
              <div
                key={i}
                className={`flex items-center justify-between px-4 py-3 rounded-lg border ${
                  r.guessed
                    ? "bg-green-500/15 border-green-500/30 text-green-400"
                    : "bg-muted/50 border-border text-muted-foreground line-through"
                }`}
              >
                <span className="font-display font-semibold text-lg">{r.word}</span>
                <span className="text-sm font-medium">
                  {r.guessed ? "✓ Guessed" : "✗ Skipped"}
                </span>
              </div>
            ))}
          </div>
          <p className="text-2xl font-display font-bold mb-6">
            Score: <span className={isTeamA ? "text-team-a" : "text-team-b"}>{score}</span> / {words.length}
          </p>
          <button
            onClick={handleContinue}
            className={`w-full py-4 rounded-lg font-display font-bold text-lg transition-all active:scale-95 shadow-lg ${
              isTeamA
                ? "bg-team-a text-team-a-foreground shadow-team-a/30"
                : "bg-team-b text-team-b-foreground shadow-team-b/30"
            }`}
          >
            Continue
          </button>
        </div>
      </div>
    );
  }

  const currentWord = words[currentIndex];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <div className="text-center w-full max-w-md">
        {/* Progress dots */}
        <div className="flex justify-center gap-2 mb-4">
          {words.map((_, i) => {
            const result = results[i];
            return (
              <div
                key={i}
                className={`w-3 h-3 rounded-full transition-all ${
                  result
                    ? result.guessed
                      ? "bg-green-500"
                      : "bg-muted-foreground/40"
                    : i === currentIndex
                    ? isTeamA ? "bg-team-a" : "bg-team-b"
                    : "bg-muted"
                }`}
              />
            );
          })}
        </div>

        <p className="text-sm text-muted-foreground mb-2">
          Word {currentIndex + 1} of {words.length}
        </p>

        {/* Timer */}
        <div className="relative w-28 h-28 mx-auto mb-6">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
            <circle cx="60" cy="60" r="54" fill="none" stroke="hsl(var(--muted))" strokeWidth="8" />
            <circle
              cx="60" cy="60" r="54" fill="none"
              stroke={isUrgent ? "hsl(var(--destructive))" : isTeamA ? "hsl(var(--team-a))" : "hsl(var(--team-b))"}
              strokeWidth="8" strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={circumference * (1 - progress)}
              className="transition-all duration-1000 linear"
            />
          </svg>
          <span className={`absolute inset-0 flex items-center justify-center text-3xl font-display font-bold ${isUrgent ? "text-destructive animate-countdown-pulse" : ""}`}>
            {timeLeft}
          </span>
        </div>

        {/* Word */}
        <div key={currentIndex} className="bg-card rounded-xl p-8 mb-6 card-glow border border-border animate-word-reveal">
          <p className="text-sm text-muted-foreground mb-2 uppercase tracking-widest">Describe this word</p>
          <h2 className="text-4xl sm:text-5xl font-bold font-display text-glow-accent text-accent leading-tight">
            {currentWord.word}
          </h2>
        </div>

        <div className="flex gap-4">
          <button onClick={() => handleAnswer(false)} className="flex-1 py-4 rounded-lg bg-muted text-muted-foreground font-display font-semibold text-lg transition-all hover:bg-muted/80 active:scale-95 flex items-center justify-center gap-2">
            <SkipForward className="w-5 h-5" /> Skip
          </button>
          <button onClick={() => handleAnswer(true)} className={`flex-1 py-4 rounded-lg font-display font-semibold text-lg transition-all active:scale-95 flex items-center justify-center gap-2 shadow-lg ${isTeamA ? "bg-team-a text-team-a-foreground shadow-team-a/30" : "bg-team-b text-team-b-foreground shadow-team-b/30"}`}>
            <Check className="w-5 h-5" /> Got it!
          </button>
        </div>
      </div>
    </div>
  );
}
