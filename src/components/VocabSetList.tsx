import { Dispatch, SetStateAction } from "react"
import IVocabSet from "../interfaces/VocabSet"
import { buildComponentKey } from "../utils/utils"

interface IProps {
    vocabSets: IVocabSet[]
    setForEditing: (vocabSet: IVocabSet) => void
    setMaybeCurrentlyLearning: Dispatch<SetStateAction<IVocabSet | undefined>>
}

const VocabSetList = (props: IProps): JSX.Element => {
    const getStartLearningHandler = (vocabSet: IVocabSet) =>
        () => props.setMaybeCurrentlyLearning(vocabSet)

    const getEditingHandler = (vocabSet: IVocabSet) =>
        () => props.setForEditing(vocabSet)

    const SingleVocabSet = (vocabSet: IVocabSet): JSX.Element => (
        <tr
            key={buildComponentKey(vocabSet.id, "SingleVocabSet")}
            className="flex-row"
        >
            <td
                className="clickable"
                onClick={getStartLearningHandler(vocabSet)}
            >{vocabSet.name}</td>
            <td
                className="clickable"
                onClick={getEditingHandler(vocabSet)}
            >Edit</td>
        </tr>
    )

    return (
        <table className="full-width">
            <tbody>
                {props.vocabSets.map(SingleVocabSet)}
            </tbody>
        </table>
    )
}

export default VocabSetList