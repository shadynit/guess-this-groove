import { useState, useCallback } from "react";
import { GameState, DEFAULT_GAME_STATE } from "@/lib/gameTypes";
import { resetWords } from "@/lib/words";
import GameSetup from "@/components/GameSetup";
import ReadyScreen from "@/components/ReadyScreen";
import GamePlay from "@/components/GamePlay";
import TurnEndScreen from "@/components/TurnEndScreen";
import GameOverScreen from "@/components/GameOverScreen";

const Index = () => {
  const [game, setGame] = useState<GameState>(DEFAULT_GAME_STATE);
  const [lastScore, setLastScore] = useState(0);

  const handleStartGame = (state: GameState) => {
    resetWords();
    setGame(state);
  };

  const handleStartTurn = () => {
    setGame((g) => ({ ...g, phase: "playing" }));
  };

  const handleTurnEnd = useCallback((wordsGuessed: number) => {
    setLastScore(wordsGuessed);
    setGame((g) => {
      const newTeams = [...g.teams] as [typeof g.teams[0], typeof g.teams[1]];
      newTeams[g.currentTeamIndex] = {
        ...newTeams[g.currentTeamIndex],
        score: newTeams[g.currentTeamIndex].score + wordsGuessed,
      };
      return { ...g, teams: newTeams, phase: "turnEnd" };
    });
  }, []);

  const handleNextTurn = () => {
    setGame((g) => {
      const nextTeamIndex = g.currentTeamIndex === 0 ? 1 : 0;
      const isRoundComplete = nextTeamIndex === 0;
      const nextRound = isRoundComplete ? g.currentRound + 1 : g.currentRound;

      if (isRoundComplete && nextRound > g.totalRounds) {
        return { ...g, phase: "gameOver" };
      }

      const nextPlayerIndex = nextTeamIndex === 0
        ? (g.currentPlayerIndex + (isRoundComplete ? 1 : 0)) % g.teams[0].players.length
        : g.currentPlayerIndex % g.teams[1].players.length;

      return {
        ...g,
        currentTeamIndex: nextTeamIndex as 0 | 1,
        currentPlayerIndex: nextPlayerIndex,
        currentRound: nextRound,
        phase: "ready",
      };
    });
  };

  const handlePlayAgain = () => {
    resetWords();
    setGame(DEFAULT_GAME_STATE);
  };

  switch (game.phase) {
    case "setup":
      return <GameSetup onStartGame={handleStartGame} />;
    case "ready":
      return <ReadyScreen game={game} onStart={handleStartTurn} />;
    case "playing":
      return <GamePlay key={`${game.currentTeamIndex}-${game.currentPlayerIndex}-${game.currentRound}`} game={game} onTurnEnd={handleTurnEnd} />;
    case "turnEnd":
      return <TurnEndScreen game={game} lastScore={lastScore} onNext={handleNextTurn} />;
    case "gameOver":
      return <GameOverScreen game={game} onPlayAgain={handlePlayAgain} />;
    default:
      return null;
  }
};

export default Index;