import { Dispatch, SetStateAction, useEffect, useState } from "react"
import IVocabSet from "../interfaces/VocabSet"
import { TLearnViewStatus } from "../types/LearnViewStatus"
import { calcTimeOut, getVocabIDsFromSet, randomizeNumberArray } from "../utils/utils"
import IVocab from "../interfaces/Vocab"
import VocabView from "./VocabView"

interface IProps {
    vocabSet: IVocabSet | undefined
    setMaybeCurrentlyLearning: Dispatch<SetStateAction<IVocabSet | undefined>>
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

    const getCloseViewOnClick = () =>
        () => props.setMaybeCurrentlyLearning(undefined)


    const getSetLearnedViewStatusOnClick = (learnViewStatus: TLearnViewStatus) =>
        () => {
            setLearnViewStatus(learnViewStatus)
            nextVocab()
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


    useEffect(() => {
        if (props.vocabSet) {
            const vocabIDs = getVocabIDsFromSet(props.vocabSet)
            const randomizedIDs = randomizeNumberArray(vocabIDs)
            setVocabDataIDs(randomizedIDs)
        }
    }, [props.vocabSet])

    useEffect(() => {
        if (learnViewStatus === "playing") {
            if (currentVocab && vocabDataIDs.length > 0) {
                clearTimeout(currentTimeOut)
                const timeOut = setTimeout(nextVocab, calculatedTimeOut)
                setCurrentTimeout(timeOut)
            }
        }
    }, [currentVocab, learnViewStatus])

    return (
        <div>
            <h1>{props.vocabSet?.name}</h1>
            {learnViewStatus === "loaded" &&
                <button
                    onClick={getSetLearnedViewStatusOnClick("playing")}
                >
                    Start learning
                </button>}
            {currentVocab
                && <VocabView
                    vocab={currentVocab}
                    calculatedTimeOut={calculatedTimeOut}
                />
            }
            <button onClick={getCloseViewOnClick()}>
                Close
            </button>
        </div>
    )
}

export default LearnView