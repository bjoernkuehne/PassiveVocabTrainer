import IVocabSet from "../interfaces/VocabSet"

interface IProps {
    vocabSet: IVocabSet[]
}

const LearnView = (props: IProps) => {
    return (
        <div>
            <h1>Learn View</h1>
        </div>
    )
}

export default LearnView