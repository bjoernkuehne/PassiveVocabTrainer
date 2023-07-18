import { useEffect, useState } from "react";
import LearnView from "./components/LearnView";
import "./styles.css";
import VocabSetList from "./components/VocabSetList";
import IVocabSet from "./interfaces/VocabSet";
import { TCurrentView } from "./types/CurrentView";
import EditVocabSetView from "./components/EditVocabSetView";
import { doesVocabSetContainID, getEmptyVocabSet, getNewIdFromLocalStorageState, loadFromLocalStorage, saveInLocalStorage } from "./utils/utils";
import { ILocalStorageState } from "./interfaces/LocalStorageState";

export default function App() {
  const [localStorageState, setLocalStorageState] = useState<ILocalStorageState>(loadFromLocalStorage())
  const [maybeCurrentlyLearning, setMaybeCurrentlyLearning] = useState<IVocabSet | undefined>(undefined)
  const [maybeCurrentlyEditing, setMaybeCurrentlyEditing] = useState<IVocabSet | undefined>(undefined)
  const [currentView, setCurrentView] = useState<TCurrentView>("dashboard")

  const onClickHandlerNewSet = () => {
    const newID = getNewIdFromLocalStorageState(localStorageState)
    const emptyVocabSet = getEmptyVocabSet(newID)
    setMaybeCurrentlyEditing(emptyVocabSet)
  }

  const resetStates = () => {
    setMaybeCurrentlyEditing(undefined)
    setMaybeCurrentlyLearning(undefined)
  }

  const handleSaveSet = (vocabSet: IVocabSet) => {
    const existingSet: boolean = doesVocabSetContainID(localStorageState, vocabSet.id)

    if (existingSet) {
      setLocalStorageState({
        ...localStorageState, data: {
          ...localStorageState.data,
          vocabSets: localStorageState.data.vocabSets
            .map((val) => val.id === vocabSet.id ? vocabSet : val)
        }
      })
    } else {
      setLocalStorageState({
        ...localStorageState, data: {
          ...localStorageState.data,
          vocabSets: [...localStorageState.data.vocabSets, vocabSet]
        }
      })
    }

    resetStates()
  }

  const deleteSet = (vocabSet: IVocabSet) => {
    setLocalStorageState({
      ...localStorageState, data: {
        ...localStorageState.data,
        vocabSets: localStorageState.data.vocabSets
          .filter((val) => val.id !== vocabSet.id)
      }
    })
    resetStates()
  }

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
      <header className="Header">
        <h1>Passive Vocab Trainer</h1>
        {currentView !== "dashboard" &&
          <button onClick={resetStates}>X</button>
        }
      </header>
      <div className="Dashboard">
        <div className="Content">
          {currentView === "dashboard" && <>
            <VocabSetList
              vocabSets={localStorageState.data.vocabSets}
              setMaybeCurrentlyLearning={setMaybeCurrentlyLearning}
            // setForEditing={setMaybeCurrentlyEditing}
            />
            <button onClick={onClickHandlerNewSet}>Add new Set</button>
          </>}
          {currentView === "learning" && <>
            <LearnView
              vocabSet={maybeCurrentlyLearning}
              setForEditing={setMaybeCurrentlyEditing}
              deleteSet={deleteSet}
              timeOutBase={5}
            />
          </>}
          {currentView === "editing" && maybeCurrentlyEditing && <>
            <EditVocabSetView vocabSet={maybeCurrentlyEditing} saveSet={handleSaveSet} />
          </>}
        </div>
      </div>
    </div>
  );
}
