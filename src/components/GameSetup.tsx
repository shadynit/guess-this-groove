import { useState } from "react";
import { GameState, DEFAULT_GAME_STATE, WordCategory, CATEGORY_LABELS } from "@/lib/gameTypes";
import { Plus, X, Users, Timer, Zap, Tags, BookOpen, Check, WifiOff, Flame, Pencil, RotateCcw, MessageCircle, Sparkles, PartyPopper, ScrollText, ShieldAlert } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import ThemeToggle from "@/components/ThemeToggle";
import InstallPrompt from "@/components/InstallPrompt";
import FeedbackButton from "@/components/FeedbackDialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
interface GameSetupProps {
  onStartGame: (state: GameState) => void;
}

const NON_ADULT_CATEGORIES = (Object.keys(CATEGORY_LABELS) as WordCategory[]).filter(c => c !== "all");

export default function GameSetup({ onStartGame }: GameSetupProps) {
  const [teamAName, setTeamAName] = useState("Team Alpha");
  const [teamBName, setTeamBName] = useState("Team Beta");
  const [teamAPlayers, setTeamAPlayers] = useState<string[]>(["Player 1", "Player 2"]);
  const [teamBPlayers, setTeamBPlayers] = useState<string[]>(["Player 1", "Player 2"]);
  const [roundTime, setRoundTime] = useState<30 | 60 | 90>(30);
  const [wordsPerTurn, setWordsPerTurn] = useState<5 | 7 | 10>(5);
  const [totalRounds, setTotalRounds] = useState(4);
  const [selectedCategories, setSelectedCategories] = useState<WordCategory[]>(["all"]);
  const [adultMode, setAdultMode] = useState(false);

  const resetToDefaults = () => {
    setTeamAName("Team Alpha");
    setTeamBName("Team Beta");
    setTeamAPlayers(["Player 1", "Player 2"]);
    setTeamBPlayers(["Player 1", "Player 2"]);
    setRoundTime(30);
    setWordsPerTurn(5);
    setTotalRounds(4);
    setSelectedCategories(["all"]);
    setAdultMode(false);
  };

  const addPlayer = (team: "a" | "b") => {
    if (team === "a") setTeamAPlayers([...teamAPlayers, ""]);
    else setTeamBPlayers([...teamBPlayers, ""]);
  };

  const removePlayer = (team: "a" | "b", idx: number) => {
    if (team === "a") setTeamAPlayers(teamAPlayers.filter((_, i) => i !== idx));
    else setTeamBPlayers(teamBPlayers.filter((_, i) => i !== idx));
  };

  const updatePlayer = (team: "a" | "b", idx: number, val: string) => {
    if (team === "a") {
      const copy = [...teamAPlayers];
      copy[idx] = val;
      setTeamAPlayers(copy);
    } else {
      const copy = [...teamBPlayers];
      copy[idx] = val;
      setTeamBPlayers(copy);
    }
  };

  const canStart =
    teamAPlayers.filter((p) => p.trim()).length >= 2 &&
    teamBPlayers.filter((p) => p.trim()).length >= 2;

  const toggleCategory = (cat: WordCategory) => {
    setSelectedCategories((prev) => {
      if (cat === "all") {
        return ["all"];
      }
      const without = prev.filter((c) => c !== "all");
      if (without.includes(cat)) {
        const result = without.filter((c) => c !== cat);
        return result.length === 0 ? ["all"] : result;
      }
      return [...without, cat];
    });
  };

  const handleStart = () => {
    const state: GameState = {
      ...DEFAULT_GAME_STATE,
      teams: [
        {
          name: teamAName || "Team Alpha",
          players: teamAPlayers.filter((p) => p.trim()).map((p) => ({ name: p.trim(), score: 0 })),
          score: 0,
          roundsPlayed: 0,
        },
        {
          name: teamBName || "Team Beta",
          players: teamBPlayers.filter((p) => p.trim()).map((p) => ({ name: p.trim(), score: 0 })),
          score: 0,
          roundsPlayed: 0,
        },
      ],
      roundTime,
      wordsPerTurn,
      totalRounds,
      adultMode,
      selectedCategories,
      phase: "ready",
    };
    onStartGame(state);
  };

  const timeOptions: (30 | 60 | 90)[] = [30, 60, 90];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8">
      <div className="w-full max-w-2xl animate-slide-up-fade">
        {/* Theme toggle */}
        <div className="flex items-center justify-between mb-2">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors active:scale-95">
                <RotateCcw className="w-3 h-3" /> Reset defaults
              </button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Reset to Defaults?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will reset all settings, team names, and players back to their default values.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={resetToDefaults}>Yes, Reset</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <ThemeToggle />
        </div>
        {/* Title */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-3 mb-3">
            <MessageCircle className="w-8 h-8 sm:w-10 sm:h-10 text-team-a animate-bounce" style={{ animationDelay: '0s', animationDuration: '2s' }} />
            <h1 className="text-5xl sm:text-6xl font-bold tracking-tight leading-none">
              <span className="text-primary">W</span>
              <span className="text-team-a">o</span>
              <span className="text-accent">r</span>
              <span className="text-secondary">d</span>
              <span className="mx-2" />
              <span className="text-team-b">R</span>
              <span className="text-primary">u</span>
              <span className="text-team-a">s</span>
              <span className="text-accent">h</span>
            </h1>
            <PartyPopper className="w-8 h-8 sm:w-10 sm:h-10 text-team-b animate-bounce" style={{ animationDelay: '0.3s', animationDuration: '2s' }} />
          </div>
          <div className="flex items-center justify-center gap-1.5 mb-1">
            <Sparkles className="w-4 h-4 text-accent animate-pulse" />
            <p className="text-muted-foreground text-lg">
              Describe the word. Don't say it. Beat the clock.
            </p>
            <Sparkles className="w-4 h-4 text-accent animate-pulse" style={{ animationDelay: '0.5s' }} />
          </div>
        </div>

        {/* Game Rules & Features Buttons */}
        <div className="flex gap-3 mb-8">
          {/* Game Rules Dialog */}
          <Dialog>
            <DialogTrigger asChild>
              <button className="flex-1 flex items-center justify-center gap-2 py-3 rounded-lg bg-card border border-border hover:border-primary/40 transition-all active:scale-[0.97] text-sm font-semibold">
                <ScrollText className="w-5 h-5 text-primary" />
                Game Rules
              </button>
            </DialogTrigger>
            <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2 text-xl">
                  <ScrollText className="w-5 h-5 text-primary" />
                  Game Rules
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
                <div className="flex gap-2">
                  <span className="text-lg shrink-0">🎯</span>
                  <p><strong className="text-foreground">The Goal:</strong> Get your team to guess as many words as possible before time runs out. Each correct guess = 1 point.</p>
                </div>
                <div className="flex gap-2">
                  <span className="text-lg shrink-0">👀</span>
                  <p><strong className="text-foreground">One Player Sees the Screen:</strong> Only the active player (describer) looks at the phone. Teammates must NOT see the words.</p>
                </div>
                <div className="flex gap-2">
                  <span className="text-lg shrink-0">🗣️</span>
                  <p><strong className="text-foreground">Describe It!</strong> Use clues, gestures, sounds — anything to get your team to shout the correct word aloud.</p>
                </div>
                <div className="flex gap-2">
                  <span className="text-lg shrink-0">✅</span>
                  <p><strong className="text-foreground">Tap to Score:</strong> When your teammate guesses correctly, tap that word — it turns green and scores a point for your team.</p>
                </div>
                <div className="flex gap-2">
                  <span className="text-lg shrink-0">⏱️</span>
                  <p><strong className="text-foreground">Beat the Clock:</strong> The timer counts down. When it hits zero, a buzzer sounds and the round ends automatically.</p>
                </div>
                <div className="mt-2 p-3 rounded-lg bg-destructive/10 border border-destructive/20">
                  <div className="flex items-center gap-2 mb-2">
                    <ShieldAlert className="w-4 h-4 text-destructive" />
                    <strong className="text-foreground text-sm">You are NOT allowed to:</strong>
                  </div>
                  <ul className="space-y-1 ml-1">
                    <li>❌ Say the word</li>
                    <li>❌ Use synonyms</li>
                    <li>❌ Use antonyms</li>
                    <li>❌ Use parts of the word</li>
                    <li>❌ Translate to another language</li>
                  </ul>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          {/* Features Dialog */}
          <Dialog>
            <DialogTrigger asChild>
              <button className="flex-1 flex items-center justify-center gap-2 py-3 rounded-lg bg-card border border-border hover:border-accent/40 transition-all active:scale-[0.97] text-sm font-semibold">
                <Zap className="w-5 h-5 text-accent" />
                Features
              </button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2 text-xl">
                  <Zap className="w-5 h-5 text-accent" />
                  Features
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div className="flex items-start gap-3">
                  <WifiOff className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                  <p><strong className="text-foreground">Works Offline</strong> — After first load, play anywhere without internet</p>
                </div>
                <div className="flex items-start gap-3">
                  <Users className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                  <p><strong className="text-foreground">Multiplayer</strong> — Unlimited players across two teams</p>
                </div>
                <div className="flex items-start gap-3">
                  <Tags className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                  <p><strong className="text-foreground">Word Categories</strong> — Choose topics or mix them all</p>
                </div>
                <div className="flex items-start gap-3">
                  <Flame className="w-5 h-5 text-destructive mt-0.5 shrink-0" />
                  <p><strong className="text-foreground">18+ Adult Mode</strong> — Toggle spicy & adult words for grown-up fun</p>
                </div>
                <div className="flex items-start gap-3">
                  <Trophy className="w-5 h-5 text-accent mt-0.5 shrink-0" />
                  <p><strong className="text-foreground">Live Leaderboard</strong> — Track scores and top players in real-time</p>
                </div>
                <div className="flex items-start gap-3">
                  <RotateCcw className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                  <p><strong className="text-foreground">Unlimited Replay</strong> — Play as many games as you want, no limits</p>
                </div>
                <div className="flex items-start gap-3">
                  <Ban className="w-5 h-5 text-team-a mt-0.5 shrink-0" />
                  <p><strong className="text-foreground">No Ads</strong> — 100% ad-free experience, forever</p>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Teams */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
          {/* Team A */}
          <div className="bg-card rounded-lg p-5 card-glow-team-a border border-team-a/20">
            <div className="flex items-center gap-2 mb-4">
              <Users className="w-5 h-5 text-team-a" />
              <div className="relative flex-1">
                <input
                  value={teamAName}
                  onChange={(e) => setTeamAName(e.target.value)}
                  className="bg-transparent border-b-2 border-dashed border-team-a/40 text-team-a font-display text-xl font-semibold outline-none w-full pr-7 placeholder:text-team-a/40 focus:border-team-a hover:border-team-a/70 transition-colors cursor-text"
                  placeholder="Tap to edit team name"
                />
                <Pencil className="w-4 h-4 text-team-a/50 absolute right-1 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
            <div className="space-y-2">
              {teamAPlayers.map((p, i) => (
                <div key={i} className="flex gap-2">
                  <div className="relative flex-1">
                    <input
                      value={p}
                      onChange={(e) => updatePlayer("a", i, e.target.value)}
                      placeholder="Type player name"
                      className="flex-1 w-full bg-muted rounded-md px-3 py-2 pr-8 text-sm outline-none focus:ring-2 focus:ring-team-a/50 placeholder:text-muted-foreground/60 placeholder:italic"
                    />
                    <Pencil className="w-3 h-3 text-muted-foreground/50 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                  {teamAPlayers.length > 1 && (
                    <button
                      onClick={() => removePlayer("a", i)}
                      className="text-muted-foreground hover:text-destructive transition-colors active:scale-95"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
              <button
                onClick={() => addPlayer("a")}
                className="flex items-center gap-1 text-sm text-team-a/70 hover:text-team-a transition-colors mt-1 active:scale-95"
              >
                <Plus className="w-4 h-4" /> Add player
              </button>
            </div>
          </div>

          {/* Team B */}
          <div className="bg-card rounded-lg p-5 card-glow-team-b border border-team-b/20">
            <div className="flex items-center gap-2 mb-4">
              <Users className="w-5 h-5 text-team-b" />
              <div className="relative flex-1">
                <input
                  value={teamBName}
                  onChange={(e) => setTeamBName(e.target.value)}
                  className="bg-transparent border-b-2 border-dashed border-team-b/40 text-team-b font-display text-xl font-semibold outline-none w-full pr-7 placeholder:text-team-b/40 focus:border-team-b hover:border-team-b/70 transition-colors cursor-text"
                  placeholder="Tap to edit team name"
                />
                <Pencil className="w-4 h-4 text-team-b/50 absolute right-1 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
            <div className="space-y-2">
              {teamBPlayers.map((p, i) => (
                <div key={i} className="flex gap-2">
                  <div className="relative flex-1">
                    <input
                      value={p}
                      onChange={(e) => updatePlayer("b", i, e.target.value)}
                      placeholder="Type player name"
                      className="flex-1 w-full bg-muted rounded-md px-3 py-2 pr-8 text-sm outline-none focus:ring-2 focus:ring-team-b/50 placeholder:text-muted-foreground/60 placeholder:italic"
                    />
                    <Pencil className="w-3 h-3 text-muted-foreground/50 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                  {teamBPlayers.length > 1 && (
                    <button
                      onClick={() => removePlayer("b", i)}
                      className="text-muted-foreground hover:text-destructive transition-colors active:scale-95"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
              <button
                onClick={() => addPlayer("b")}
                className="flex items-center gap-1 text-sm text-team-b/70 hover:text-team-b transition-colors mt-1 active:scale-95"
              >
                <Plus className="w-4 h-4" /> Add player
              </button>
            </div>
          </div>
        </div>

        {/* Settings */}
        <div className="bg-card rounded-lg p-5 card-glow border border-border mb-8">
          <div className="flex flex-col sm:flex-row gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-3">
                <Timer className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">Timer per turn</span>
              </div>
              <div className="flex gap-2">
                {timeOptions.map((t) => (
                  <button
                    key={t}
                    onClick={() => setRoundTime(t)}
                    className={`flex-1 py-2 rounded-md text-sm font-semibold transition-all active:scale-95 ${
                      roundTime === t
                        ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                        : "bg-muted text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {t}s
                  </button>
                ))}
              </div>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-3">
                <Zap className="w-4 h-4 text-accent" />
                <span className="text-sm font-medium">Words per turn</span>
              </div>
              <div className="flex gap-2">
                {([5, 6] as const).map((w) => (
                  <button
                    key={w}
                    onClick={() => setWordsPerTurn(w)}
                    className={`flex-1 py-2 rounded-md text-sm font-semibold transition-all active:scale-95 ${
                      wordsPerTurn === w
                        ? "bg-accent text-accent-foreground shadow-lg shadow-accent/25"
                        : "bg-muted text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {w}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-3">
                <Zap className="w-4 h-4 text-accent" />
                <span className="text-sm font-medium">Total rounds</span>
              </div>
              <div className="flex gap-2">
                {[2, 4, 6].map((r) => (
                  <button
                    key={r}
                    onClick={() => setTotalRounds(r)}
                    className={`flex-1 py-2 rounded-md text-sm font-semibold transition-all active:scale-95 ${
                      totalRounds === r
                        ? "bg-accent text-accent-foreground shadow-lg shadow-accent/25"
                        : "bg-muted text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {r}
                  </button>
                ))}
                <input
                  type="number"
                  min={1}
                  max={50}
                  value={[2, 4, 6].includes(totalRounds) ? "" : totalRounds}
                  placeholder="Custom"
                  onChange={(e) => {
                    const v = parseInt(e.target.value);
                    if (v >= 1 && v <= 50) setTotalRounds(v);
                  }}
                  className={`flex-1 py-2 rounded-md text-sm font-semibold text-center outline-none transition-all ${
                    ![2, 4, 6].includes(totalRounds)
                      ? "bg-accent text-accent-foreground shadow-lg shadow-accent/25"
                      : "bg-muted text-muted-foreground hover:text-foreground"
                  } placeholder:text-muted-foreground`}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Word Categories */}
        <div className="bg-card rounded-lg p-5 card-glow border border-border mb-4">
          <div className="flex items-center gap-2 mb-3">
            <Tags className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">Word Categories</span>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => toggleCategory("all")}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all active:scale-95 flex items-center gap-1 ${
                selectedCategories.includes("all")
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-muted text-muted-foreground hover:text-foreground"
              }`}
            >
              {selectedCategories.includes("all") && <Check className="w-3 h-3" />}
              {CATEGORY_LABELS.all}
            </button>
            {NON_ADULT_CATEGORIES.map((cat) => {
              const isSelected = selectedCategories.includes(cat);
              return (
                <button
                  key={cat}
                  onClick={() => toggleCategory(cat)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all active:scale-95 flex items-center gap-1 ${
                    isSelected
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "bg-muted text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {isSelected && <Check className="w-3 h-3" />}
                  {CATEGORY_LABELS[cat]}
                </button>
              );
            })}
          </div>
        </div>

        {/* Adult 18+ Toggle */}
        <div className="bg-card rounded-lg p-4 border border-destructive/20 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${adultMode ? "bg-destructive/15" : "bg-muted"}`}>
                <Flame className={`w-5 h-5 ${adultMode ? "text-destructive" : "text-muted-foreground"}`} />
              </div>
              <div>
                <p className="font-display font-semibold text-sm">Adult 18+ Mode</p>
                <p className="text-xs text-muted-foreground">Include spicy & adult words in the game</p>
              </div>
            </div>
            <Switch
              checked={adultMode}
              onCheckedChange={setAdultMode}
              className="data-[state=checked]:bg-destructive"
            />
          </div>
        </div>

        {/* Start */}
        <button
          disabled={!canStart}
          onClick={handleStart}
          className={`w-full py-4 rounded-lg text-lg font-display font-bold transition-all active:scale-[0.97] ${
            canStart
              ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30 hover:shadow-primary/50"
              : "bg-muted text-muted-foreground cursor-not-allowed"
          }`}
        >
          {canStart ? "Let's Go!" : "Add at least 2 players per team"}
        </button>

        <InstallPrompt />

        {/* Version */}
        <p className="text-center text-xs text-muted-foreground/50 mt-6">v2.2</p>
        <FeedbackButton />
      </div>
    </div>
  );
}
