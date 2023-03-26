import React, { useCallback, useEffect, useState } from "react";
import { Button, Card, Container, Text } from "../components";
import { CardType, useDeckAction, useNewDeck } from "../services";
import Box from "@mui/material/Box";
import { SxProps } from "@mui/material";
import { getFinalScore } from "../utilities/blackJack";

export const TablePage = () => {
  const [deckId, setDeckId] = useState<string>("");
  const [house, setHouse] = useState<CardType[]>([]);
  const [player1, setPlayer1] = useState<CardType[]>([]);

  const newDeck = useNewDeck(!!deckId);
  const draw4 = useDeckAction(
    "draw",
    newDeck.data?.deck_id ?? "",
    4,
    !!(deckId === "") // skip only is deckId is empty
  );
  const draw1 = useDeckAction("draw", newDeck.data?.deck_id ?? "", 1, true);

  useEffect(() => {
    if (newDeck.isSuccess) {
      setDeckId(newDeck.data.deck_id);
    }
  }, [newDeck.data?.deck_id, newDeck.isSuccess]);

  useEffect(() => {
    if (draw4.isSuccess) {
      setHouse([...draw4.data.cards?.slice(0, 2)]);
      setPlayer1([...draw4.data.cards?.slice(2, 4)]);
    }
  }, [draw4.data?.cards, draw4.isSuccess]);

  const handleHit = useCallback(() => {
    draw1.refetch().then((response) => {
      setPlayer1((cards) => [...cards.concat(response.data!.cards)]);
    });
  }, [draw1]);

  const handleStand = useCallback(() => {
    const finalScore = getFinalScore(house, player1);
    alert(
      `${finalScore.message.toUpperCase()}!!!!\nYour Score: ${
        finalScore.player1
      }\nHouse Score: ${finalScore.house}`
    );
    setDeckId("");
  }, [house, player1]);

  return (
    <Container>
      <Box sx={styles.greenTable}>
        <Text
          text="BLACK JACK"
          variant="h3"
          marginBottom={4}
          color={"whitesmoke"}
        />
        <Text text="House" variant="subtitle1" color={"whitesmoke"} />
        <Box sx={styles.tableLayout}>
          {draw4.isLoading ? (
            <Text text="loading ..." variant="subtitle2" color={"whitesmoke"} />
          ) : (
            house.map((elem) => {
              return (
                <Card imgName={elem.suit} size="small" imgUrl={elem.image} />
              );
            })
          )}
        </Box>
        <Box sx={styles.tableLayout}>
          <Button
            text="hit"
            onClick={() => handleHit()}
            variant="contained"
            sx={{
              marginX: 5,
              backgroundColor: "greenyellow",
              color: "black",
            }}
            size="large"
          />
          <Button
            text="stand"
            onClick={() => handleStand()}
            variant="contained"
            sx={{
              marginX: 5,
              backgroundColor: "red",
              color: "black",
            }}
            size="large"
          />
          <Button
            text="new game"
            onClick={() => setDeckId("")}
            variant="contained"
            sx={{
              marginX: 5,
              backgroundColor: "yellow",
              color: "black",
            }}
            size="large"
          />
        </Box>
        <Text text="Player 1" variant="subtitle1" color={"whitesmoke"} />
        <Box sx={styles.tableLayout}>
          {draw4.isLoading ? (
            <Text text="loading ..." variant="subtitle2" color={"whitesmoke"} />
          ) : (
            player1.map((elem) => {
              return (
                <Card imgName={elem.suit} size="small" imgUrl={elem.image} />
              );
            })
          )}
        </Box>
      </Box>
    </Container>
  );
};
const styles = {
  tableLayout: {
    display: "flex",
    justifyContent: "center",
    paddingY: 5,
    minWidth: "100%",
  } as SxProps,
  greenTable: {
    padding: 5,
    borderRadius: 5,
    bgcolor: "green",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    minWidth: "100%",
  } as SxProps,
};
