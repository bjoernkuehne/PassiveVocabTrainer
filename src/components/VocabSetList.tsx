import { Dispatch, SetStateAction } from "react"
import IVocabSet from "../interfaces/VocabSet"
import { buildComponentKey } from "../utils/utils"

interface IProps {
    vocabSets: IVocabSet[]
    setMaybeCurrentlyLearning: Dispatch<SetStateAction<IVocabSet | undefined>>
}

const VocabSetList = (props: IProps): JSX.Element => {
    const getStartLearningHandler = (vocabSet: IVocabSet) =>
        () => props.setMaybeCurrentlyLearning(vocabSet)

    const SingleVocabSet = (vocabSet: IVocabSet): JSX.Element => (
        <tr
            key={buildComponentKey(vocabSet.id, "SingleVocabSet")}
            className="flex-row SetTr"
        >
            <td
                className="clickable"
                onClick={getStartLearningHandler(vocabSet)}
            >{vocabSet.name}</td>
            <td>{`${vocabSet.vocabData.length} item${vocabSet.vocabData.length === 1 ? "" : "s"}`}</td>
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