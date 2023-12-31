import { ChangeEvent } from "react";
import IVocab from "../interfaces/Vocab";
import Input from "./Input";

interface IProps {
    vocab: IVocab
    handleVocabUpdate: (vocab: IVocab) => void
    handleRemove?: (vocab: IVocab) => void
}

const EditVocabRow = (props: IProps): JSX.Element => {
    const handlerTargetLanguage =
        (event: ChangeEvent<HTMLInputElement>) => props.handleVocabUpdate({ ...props.vocab, targetLanguage: event.target.value })

    const handlerTranslation =
        (event: ChangeEvent<HTMLInputElement>) => props.handleVocabUpdate({ ...props.vocab, translation: event.target.value })

    const getRemoveHandler = () => {
        if (props.handleRemove) props.handleRemove(props.vocab)
    }

    return (
        <div className="EditVocabRow">
            <Input
                labelName="front"
                componentName={`${props.vocab.id}_targetLanguage`}
                value={props.vocab.targetLanguage}
                onChange={handlerTargetLanguage}
            />
            <Input
                labelName="back"
                componentName={`${props.vocab.id}_translation`}
                value={props.vocab.translation}
                onChange={handlerTranslation}
            />
            <button disabled={!props.handleRemove} onClick={getRemoveHandler}>-</button>
        </div>
    )
}

export default EditVocabRow