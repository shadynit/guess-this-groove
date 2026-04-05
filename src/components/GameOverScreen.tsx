import { useState, useEffect } from "react";
import { GameState } from "@/lib/gameTypes";
import { Crown, RotateCcw, Trophy, Scale, PartyPopper, Sparkles } from "lucide-react";

const WINNER_LINES = [
  "Someone stop them 😄",
  "Too good for this game!",
  "Are you cheating or what? 👀",
  "Absolute legends! 🏆",
  "Unstoppable force! 💪",
];

const RUNNER_UP_LINES = [
  "Blame the timer 😅",
  "That was rigged!",
  "We demand a rematch!",
  "Close but no cigar 🤏",
  "Next time for sure! 💪",
];

const TIE_LINES = [
  "What a showdown! 🤯",
  "Nobody loses today!",
  "The universe couldn't decide 🌀",
];

function pickRandom(arr: string[]) {
  return arr[Math.floor(Math.random() * arr.length)];
}

interface GameOverScreenProps {
  game: GameState;
  onPlayAgain: () => void;
}

export default function GameOverScreen({ game, onPlayAgain }: GameOverScreenProps) {
  const [teamA, teamB] = game.teams;
  const winner = teamA.score > teamB.score ? 0 : teamB.score > teamA.score ? 1 : -1;
  const isTie = winner === -1;

  const [winnerLine] = useState(() => pickRandom(WINNER_LINES));
  const [runnerLine] = useState(() => pickRandom(RUNNER_UP_LINES));
  const [tieLine] = useState(() => pickRandom(TIE_LINES));
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setShowConfetti(false), 3000);
    return () => clearTimeout(t);
  }, []);

  const sortedTeams = [...game.teams]
    .map((team, idx) => ({ team, originalIndex: idx }))
    .sort((a, b) => b.team.score - a.team.score);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden">
      {/* Confetti burst */}
      {showConfetti && !isTie && (
        <div className="absolute inset-0 pointer-events-none z-10">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute text-2xl animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 60}%`,
                animationDelay: `${Math.random() * 1}s`,
                animationDuration: `${1 + Math.random() * 2}s`,
                opacity: 1 - i * 0.03,
              }}
            >
              {["🎉", "🎊", "✨", "⭐", "🌟"][i % 5]}
            </div>
          ))}
        </div>
      )}

      <div className="text-center animate-slide-up-fade max-w-md w-full relative z-20">
        {/* Icon */}
        <div className="relative mb-6">
          {isTie ? (
            <Scale className="w-16 h-16 mx-auto text-muted-foreground animate-pulse" />
          ) : (
            <div className="relative">
              <div className="flex items-center justify-center gap-2">
                <PartyPopper className="w-8 h-8 text-accent animate-bounce" style={{ animationDelay: '0.2s' }} />
                <Trophy className="w-16 h-16 text-accent animate-bounce" />
                <PartyPopper className="w-8 h-8 text-accent animate-bounce" style={{ animationDelay: '0.4s' }} />
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-accent/20 animate-ping" style={{ animationDuration: '2s' }} />
              </div>
              <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-accent animate-pulse" />
              <Sparkles className="absolute -bottom-1 -left-2 w-5 h-5 text-accent animate-pulse" style={{ animationDelay: '0.5s' }} />
            </div>
          )}
        </div>

        <h1 className="text-4xl sm:text-5xl font-bold mb-2 text-glow-accent">
          {isTie ? "It's a Tie!" : `${game.teams[winner as number].name} Wins!`}
        </h1>
        <p className="text-muted-foreground mb-8 text-lg italic">
          {isTie ? tieLine : winnerLine}
        </p>

        {/* Leaderboard */}
        <div className="flex flex-col gap-4 mb-10">
          {sortedTeams.map(({ team, originalIndex }, rank) => {
            const isWinner = !isTie && rank === 0;
            const isRunnerUp = !isTie && rank === 1;
            const isA = originalIndex === 0;
            const rankedPlayers = [...team.players].sort((a, b) => b.score - a.score);
            const topPlayers = rankedPlayers.slice(0, 3);
            const medalIcons = ["🥇", "🥈", "🥉"];

            return (
              <div
                key={originalIndex}
                className={`rounded-xl px-6 py-5 border transition-all ${
                  isWinner
                    ? isA
                      ? "bg-team-a/15 border-team-a/40 card-glow-team-a scale-[1.03]"
                      : "bg-team-b/15 border-team-b/40 card-glow-team-b scale-[1.03]"
                    : "bg-card border-border"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className={`text-2xl font-bold ${
                      isWinner ? "text-accent" : "text-muted-foreground"
                    }`}>
                      {isWinner ? <Trophy className="w-6 h-6 animate-bounce" /> : `#${rank + 1}`}
                    </span>
                    <div className="text-left">
                      <p className={`font-display font-semibold ${isA ? "text-team-a" : "text-team-b"}`}>
                        {team.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {team.roundsPlayed} rounds played · {team.players.length} players
                      </p>
                    </div>
                  </div>
                  <p className={`text-4xl font-bold ${isA ? "text-team-a" : "text-team-b"}`}>
                    {team.score}
                  </p>
                </div>

                {/* Fun line for runner-up */}
                {isRunnerUp && (
                  <p className="text-xs text-muted-foreground italic mt-1 ml-9">
                    {runnerLine}
                  </p>
                )}

                {/* Score bar */}
                <div className="mt-3 h-2 rounded-full bg-muted overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ${
                      isA ? "bg-team-a" : "bg-team-b"
                    }`}
                    style={{
                      width: `${Math.max(sortedTeams[0].team.score, 1) > 0
                        ? (team.score / Math.max(sortedTeams[0].team.score, 1)) * 100
                        : 0}%`,
                    }}
                  />
                </div>
                {/* Top 3 players ranked by score */}
                {topPlayers.length > 0 && (
                  <div className="mt-3 space-y-1">
                    {topPlayers.map((p, i) => (
                      <div
                        key={i}
                        className={`flex items-center justify-between text-xs px-2.5 py-1 rounded-md ${
                          isA ? "bg-team-a/10" : "bg-team-b/10"
                        }`}
                      >
                        <span className={`flex items-center gap-1.5 font-medium ${isA ? "text-team-a" : "text-team-b"}`}>
                          <span>{medalIcons[i] ?? ""}</span>
                          {p.name}
                        </span>
                        <span className="text-muted-foreground font-semibold">{p.score} pts</span>
                      </div>
                    ))}
                    {team.players.length > 3 && (
                      <p className="text-xs text-muted-foreground pl-2">
                        +{team.players.length - 3} more players
                      </p>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <button
          onClick={onPlayAgain}
          className="w-full py-4 rounded-lg bg-primary text-primary-foreground font-display font-bold text-lg transition-all active:scale-[0.97] shadow-lg shadow-primary/30 flex items-center justify-center gap-2"
        >
          <RotateCcw className="w-5 h-5" />
          New Game
        </button>
      </div>
    </div>
  );
}
