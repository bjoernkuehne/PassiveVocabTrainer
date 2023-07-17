import { useState } from "react";
import LearnView from "./components/LearnView";
import "./styles.css";
import { createMockVocabSets } from "./data/mock-data";

export default function App() {
  const [vocabSets, setVocabSets] = useState(createMockVocabSets(5, 10))

  return (
    <div className="App">
      <h1>Passive Vocab Trainer</h1>
    </div>
  );
}
