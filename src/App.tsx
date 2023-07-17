import { useEffect, useState } from "react";
import LearnView from "./components/LearnView";
import "./styles.css";
import { createMockVocabSets } from "./data/mock-data";
import VocabSetList from "./components/VocabSetList";
import IVocabSet from "./interfaces/VocabSet";
import { TCurrentView } from "./types/CurrentView";
import EditVocabSetView from "./components/EditVocabSetView";
import { getEmptyVocabSet, loadFromLocalStorage, saveInLocalStorage } from "./utils/utils";
import { ILocalStorageState } from "./interfaces/LocalStorageState";

export default function App() {
  const [localStorageState, setLocalStorageState] = useState<ILocalStorageState>(loadFromLocalStorage())
  // const [vocabSets, setVocabSets] = useState(createMockVocabSets(5, 10))
  const [maybeCurrentlyLearning, setMaybeCurrentlyLearning] = useState<IVocabSet | undefined>(undefined)
  const [maybeCurrentlyEditing, setMaybeCurrentlyEditing] = useState<IVocabSet | undefined>(undefined)
  const [currentView, setCurrentView] = useState<TCurrentView>("dashboard")

  useEffect(() => {
    saveInLocalStorage(localStorageState)
  }, [localStorageState])

  useEffect(() => {
    if (maybeCurrentlyEditing) {
      setCurrentView("editing")
    } else if (maybeCurrentlyLearning) {
      setCurrentView("learning")
    } else {
      setCurrentView("dashboard")
    }
  }, [maybeCurrentlyLearning, maybeCurrentlyEditing])

  return (
    <div className="App">
      <h1>Passive Vocab Trainer</h1>
      {currentView === "dashboard" && <>
        <VocabSetList vocabSets={localStorageState.data.vocabSets} setMaybeCurrentlyLearning={setMaybeCurrentlyLearning} />
        <button onClick={() => setMaybeCurrentlyEditing(getEmptyVocabSet(1))}>Add new Set</button>
      </>}
      {currentView === "learning" && <>
        <LearnView
          vocabSet={maybeCurrentlyLearning}
          setMaybeCurrentlyLearning={setMaybeCurrentlyLearning}
          timeOutBase={1}
        />
      </>}
      {currentView === "editing" && maybeCurrentlyEditing && <>
        <EditVocabSetView vocabSet={maybeCurrentlyEditing} />
      </>}
    </div>
  );
}
