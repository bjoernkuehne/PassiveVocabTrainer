import { Dispatch, SetStateAction, useEffect, useState } from "react"
import IVocabSet from "../interfaces/VocabSet"
import { TLearnViewStatus } from "../types/LearnViewStatus"
import { getVocabIDsFromSet } from "../utils/utils"

interface IProps {
    vocabSet: IVocabSet | undefined
    setMaybeCurrentlyLearning: Dispatch<SetStateAction<IVocabSet | undefined>>
}

const LearnView = (props: IProps) => {
    const [vocabDataIDs, setVocabDataIDs] = useState<number[]>([])

    const [learnViewStatus, setLearnViewStatus] = useState<TLearnViewStatus>("loaded")

    const getCloseViewOnClick = () =>
        () => props.setMaybeCurrentlyLearning(undefined)


    const getSetLearnedViewStatusOnClick = (learnViewStatus: TLearnViewStatus) =>
        () => setLearnViewStatus(learnViewStatus)

    useEffect(() => {
        if (props.vocabSet)
            setVocabDataIDs(getVocabIDsFromSet(props.vocabSet))
    }, [props.vocabSet])

    return (
        <div>
            <h1>{props.vocabSet?.name}</h1>
            <button onClick={getSetLearnedViewStatusOnClick("playing")}>
                Start learning
            </button>
            <button onClick={getCloseViewOnClick()}>
                Close
            </button>
        </div>
    )
}

export default LearnView