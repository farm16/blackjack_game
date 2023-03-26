import { CardType } from "../services";

const TOTAL = 21;

export const getFinalScore = (house: CardType[], player1: CardType[]) => {
  const player1Score = getScore(player1);
  const houseScore = getScore(house);
  return {
    message: getScoreMessage(houseScore, player1Score),
    house: houseScore,
    player1: player1Score,
  };
};

const getScore = (playerData: CardType[]) => {
  const hasAce = playerData.some((elem) => elem.code === "AS");
  let score = (
    hasAce ? playerData.filter((elem) => elem.code === "AS") : playerData
  ).reduce((acc, cur) => {
    return acc + getCardNumberValue(cur.value);
  }, 0);
  if (hasAce) {
    if (score + 11 >= 21) {
      score += 11;
    } else {
      score++;
    }
  }
  return score;
};
const getDistance = (from: number) => {
  return TOTAL - from;
};
function getScoreMessage(house: number, player1: number) {
  if (house === player1) return "its a tie";
  if (player1 > TOTAL) return "you lost";
  return getDistance(house) > getDistance(player1) ? "you won" : "you lost";
}
function getCardNumberValue(value: string) {
  switch (value) {
    case "1":
      return 1;
    case "2":
      return 2;
    case "3":
      return 3;
    case "4":
      return 4;
    case "5":
      return 5;
    case "6":
      return 6;
    case "7":
      return 7;
    case "8":
      return 8;
    case "9":
      return 9;
    default:
      return 10;
  }
}
