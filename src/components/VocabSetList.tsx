import IVocabSet from "../interfaces/VocabSet"

interface IProps {
    vocabSets: IVocabSet[]
}

const VocabSetList = (props: IProps): JSX.Element => {
    const SingleVocabSet = (vocabSet: IVocabSet): JSX.Element => (
        <tr>{vocabSet.name}</tr>
    )

    return (
        <table>
            {props.vocabSets.map(SingleVocabSet)}
        </table>
    )
}

export default VocabSetList