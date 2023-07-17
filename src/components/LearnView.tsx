import { Dispatch, SetStateAction } from "react"
import IVocabSet from "../interfaces/VocabSet"

interface IProps {
    vocabSet: IVocabSet | undefined
    setMaybeCurrentlyLearning: Dispatch<SetStateAction<IVocabSet | undefined>>
}

const LearnView = (props: IProps) => {
    return (
        <div>
            <h1>Learn View</h1>
            <button onClick={() => props.setMaybeCurrentlyLearning(undefined)}>
                Close
            </button>
        </div>
    )
}

export default LearnView