import React from "react";
import { TablePage } from "./pages";
import { DeckOfCardsClientProvider } from "./services";

function App() {
  return (
    <DeckOfCardsClientProvider>
      <TablePage />
    </DeckOfCardsClientProvider>
  );
}

export default App;
