import React from "react";
import {
  useQuery,
  useQueryClient,
  QueryClientProvider,
  QueryClient,
} from "@tanstack/react-query";
import axios from "axios";
import { PropsWithChildren } from "react";

export const deckOfCardsClient = new QueryClient({
  defaultOptions: {
    queries: {
      //   refetchOnWindowFocus: false,
      //   refetchOnReconnect: false,
      //   retry: false,
      //   staleTime: 1000 * 60 * 60 * 24,
    },
  },
});

export const DeckOfCardsClientProvider = ({ children }: PropsWithChildren) => {
  return (
    <QueryClientProvider client={deckOfCardsClient}>
      {children}
    </QueryClientProvider>
  );
};

export type DeckOfCardsActions = keyof typeof deckOfCardsActions;
export type CardType = {
  code: string;
  image: string;
  images: object;
  suit: string;
  value: string;
};
export type DeckOfCardsSuccessResponse = Promise<{
  success: boolean;
  cards: CardType[];
  deck_id: string;
  shuffled: boolean;
  remaining: number;
}>;

const deckOfCardsActions = {
  // shuffle: async (deckId: string) => {
  //   const { data } = await axios.get<DeckOfCardsSuccessResponse>(
  //     "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"
  //   );
  //   return data;
  // },
  // reshuffle: async (deckId: string) => {
  //   const { data } = await axios.get<DeckOfCardsSuccessResponse>(
  //     `https://deckofcardsapi.com/api/deck/${deckId}/shuffle/?remaining=true`
  //   );
  //   return data;
  // },
  draw: async (deckId: string, count: number) => {
    const { data } = await axios.get<DeckOfCardsSuccessResponse>(
      `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=${count}`
    );
    return data;
  },
} as const;

export const useDeckAction = (
  action: DeckOfCardsActions,
  deckId: string,
  count: number,
  skip = false
) => {
  console.log(action);
  return useQuery({
    queryKey: [action + count],
    queryFn: () => deckOfCardsActions["draw"](deckId, count),
    enabled: !skip,
  });
};

export const useNewDeck = (skip: boolean) => {
  return useQuery({
    queryKey: ["newDeck"],

    queryFn: async () => {
      const { data } = await axios.get<DeckOfCardsSuccessResponse>(
        "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"
      );
      return data;
    },
    enabled: !skip,
  });
};
