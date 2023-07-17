import { Dispatch, SetStateAction } from "react"
import IVocabSet from "../interfaces/VocabSet"
import { buildComponentKey } from "../utils/utils"

interface IProps {
    vocabSets: IVocabSet[]
    setMaybeCurrentlyLearning: Dispatch<SetStateAction<IVocabSet | undefined>>
}

const VocabSetList = (props: IProps): JSX.Element => {
    const getOnClickTr = (vocabSet: IVocabSet) =>
        () => props.setMaybeCurrentlyLearning(vocabSet)

    const SingleVocabSet = (vocabSet: IVocabSet): JSX.Element => (
        <tr
            key={buildComponentKey(vocabSet.id, "SingleVocabSet")}
            className="clickable" onClick={getOnClickTr(vocabSet)}
        >
            <td>{vocabSet.name}</td>
        </tr>
    )

    return (
        <table>
            <tbody>
                {props.vocabSets.map(SingleVocabSet)}
            </tbody>
        </table>
    )
}

export default VocabSetList