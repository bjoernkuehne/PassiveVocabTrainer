import { Dispatch, SetStateAction } from "react"
import IVocabSet from "../interfaces/VocabSet"

interface IProps {
    vocabSets: IVocabSet[]
    setMaybeCurrentlyLearning: Dispatch<SetStateAction<IVocabSet | undefined>>
}

const VocabSetList = (props: IProps): JSX.Element => {
    const SingleVocabSet = (vocabSet: IVocabSet): JSX.Element => (
        <tr onClick={() => props.setMaybeCurrentlyLearning(vocabSet)}>
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