import { Dispatch, SetStateAction, useEffect, useState } from "react"
import IVocabSet from "../interfaces/VocabSet"
import { TLearnViewStatus } from "../types/LearnViewStatus"
import { calcTimeOut, getVocabIDsFromSet, randomizeNumberArray } from "../utils/utils"
import IVocab from "../interfaces/Vocab"
import VocabView from "./VocabView"

interface IProps {
    vocabSet: IVocabSet | undefined
    setForEditing: (vocabSet: IVocabSet) => void
    deleteSet: (vocabSet: IVocabSet) => void
    timeOutBase: number
}

const LearnView = (props: IProps) => {
    const [vocabDataIDs, setVocabDataIDs] = useState<number[]>([])
    const [learnViewStatus, setLearnViewStatus] =
        useState<TLearnViewStatus>("loaded")
    const [currentVocab, setCurrentVocab] =
        useState<IVocab | undefined>(undefined)
    const [calculatedTimeOut, setCalculatedTimeOut] =
        useState<number>(0)
    const [currentTimeOut, setCurrentTimeout] = useState<NodeJS.Timeout | undefined>(undefined)

    const getSetLearnedViewStatusOnClick = (learnViewStatus: TLearnViewStatus) =>
        () => {
            setLearnViewStatus(learnViewStatus)
            nextVocab()
        }

    const getSetForEditing = (vocabSet: IVocabSet) =>
        () => props.setForEditing(vocabSet)

    const getDeleteSetHandler = (vocabSet: IVocabSet) =>
        () => {
            if (confirm(`Do you really want to delete the set "${props.vocabSet?.name}"`)) {
                props.deleteSet(vocabSet)
            }
        }

    const nextVocab = () => {
        const currentID = vocabDataIDs[0]
        const maybeVocab = props.vocabSet?.vocabData
            .find((val) => val.id === currentID)

        if (maybeVocab) {
            setVocabDataIDs(vocabDataIDs.slice(1))
            setCurrentVocab(maybeVocab)
            setCalculatedTimeOut(calcTimeOut(props.timeOutBase, maybeVocab))
        }
    }

    const refreshVocabDataIDs = (vocabSet: IVocabSet) => {
        const vocabIDs = getVocabIDsFromSet(vocabSet)
        const randomizedIDs = randomizeNumberArray(vocabIDs)
        setVocabDataIDs(randomizedIDs)
    }

    useEffect(() => {
        if (props.vocabSet) {
            refreshVocabDataIDs(props.vocabSet)
        }
    }, [props.vocabSet])

    useEffect(() => {
        if (learnViewStatus === "playing" && props.vocabSet) {
            if (currentVocab && vocabDataIDs.length > 0) {
                clearTimeout(currentTimeOut)
                const timeOut = setTimeout(nextVocab, calculatedTimeOut)
                setCurrentTimeout(timeOut)
            } else {
                refreshVocabDataIDs(props.vocabSet)
            }
        }
    }, [currentVocab, learnViewStatus, vocabDataIDs])

    return (
        <>
            {learnViewStatus !== "playing" &&
                <h1>{props.vocabSet?.name}</h1>
            }
            {learnViewStatus === "loaded" && <>
                <div className="flex-row">
                    <button
                        onClick={getSetLearnedViewStatusOnClick("playing")}
                    >
                        Start learning
                    </button>
                    {props.vocabSet &&
                        <button
                            onClick={getDeleteSetHandler(props.vocabSet)}
                        >
                            Delete Set
                        </button>
                    }
                    {props.vocabSet &&
                        <button
                            onClick={getSetForEditing(props.vocabSet)}
                        >
                            Edit Set
                        </button>
                    }
                </div>
                <div>
                    {props.vocabSet?.vocabData.map((val) => <p>{val.targetLanguage}</p>)}
                </div>
            </>}
            {currentVocab
                && <VocabView
                    vocab={currentVocab}
                    calculatedTimeOut={calculatedTimeOut}
                />
            }
        </>
    )
}

export default LearnView