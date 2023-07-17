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
        <div>
            <p>{props.vocab.targetLanguage}</p>
            <p>
                {viewState === "translation" ? props.vocab.translation : "..."}
            </p>
        </div>
    )
}

export default VocabView