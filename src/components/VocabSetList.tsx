import { Dispatch, SetStateAction } from "react"
import IVocabSet from "../interfaces/VocabSet"

interface IProps {
    vocabSets: IVocabSet[]
    setMaybeCurrentlyLearning: Dispatch<SetStateAction<IVocabSet | undefined>>
}

const VocabSetList = (props: IProps): JSX.Element => {
    const getOnClickTr = (vocabSet: IVocabSet) =>
        () => props.setMaybeCurrentlyLearning(vocabSet)

    const SingleVocabSet = (vocabSet: IVocabSet): JSX.Element => (
        <tr className="clickable" onClick={getOnClickTr(vocabSet)}>
            {vocabSet.name}
        </tr>
    )

    return (
        <table>
            {props.vocabSets.map(SingleVocabSet)}
        </table>
    )
}

export default VocabSetList