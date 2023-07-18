import { useEffect, useState } from "react"
import IVocab from "../interfaces/Vocab"

interface IProps {
    vocab: IVocab
    calculatedTimeOut: number
}

type TViewState =
    "target" |
    "translation"

const VocabView = (props: IProps): JSX.Element => {
    const [viewState, setViewState] = useState<TViewState>("target")

    useEffect(() => {
        setViewState("target")

        const timeOutTemp =
            setTimeout(() => {
                setViewState("translation")
                clearTimeout(timeOutTemp)
            }, props.calculatedTimeOut * 0.55)
    }, [props.vocab])

    return (
        <table className="VocabView">
            <tr className={`VocabViewTargetLanguage ${viewState === "target" ? "fadeIn" : ""}`}>{props.vocab.targetLanguage}</tr>
            <tr className={`VocabViewTranslation ${viewState === "translation" ? "fadeIn" : ""}`}>
                {viewState === "translation" ? props.vocab.translation : ""}
            </tr>
        </table>
    )
}

export default VocabView