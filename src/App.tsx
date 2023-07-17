import { useState } from "react";
import LearnView from "./components/LearnView";
import "./styles.css";
import { createMockVocabSets } from "./data/mock-data";
import VocabSetList from "./components/VocabSetList";
import IVocabSet from "./interfaces/VocabSet";

export default function App() {
  const [vocabSets, setVocabSets] = useState(createMockVocabSets(5, 10))
  const [maybeCurrentlyLearning, setMaybeCurrentlyLearning] = useState<IVocabSet | undefined>(undefined)

  return (
    <div className="App">
      <h1>Passive Vocab Trainer</h1>
      {maybeCurrentlyLearning
        ? <LearnView vocabSet={maybeCurrentlyLearning}
         setMaybeCurrentlyLearning={setMaybeCurrentlyLearning}/>        : <VocabSetList vocabSets={vocabSets} setMaybeCurrentlyLearning={setMaybeCurrentlyLearning} />
      }
    </div>
  );
}
