import { ChangeEvent, useEffect, useState } from "react";
import IVocabSet from "../interfaces/VocabSet";
import Input from "./Input";
import EditVocabRow from "./EditVocabRow";
import { buildComponentKey, getEmptyVocab, getEmptyVocabSet } from "../utils/utils";
import IVocab from "../interfaces/Vocab";

interface IProps {
    vocabSet: IVocabSet
    saveSet: (vocabSet: IVocabSet) => void
}

const EditVocabSetView = (props: IProps) => {
    const [localVocabSet, setLocalVocabSet] = useState<IVocabSet>(props.vocabSet)

    const setName = (event: ChangeEvent<HTMLInputElement>) => {
        setLocalVocabSet({ ...localVocabSet, name: event.target.value })
    }

    const handleOnSave = () => {
        props.saveSet(localVocabSet)
    }

    const handleVocabUpdate = (vocab: IVocab) => {
        setLocalVocabSet({ ...localVocabSet, vocabData: localVocabSet.vocabData.map((val) => val.id === vocab.id ? vocab : val) })
    }

    useEffect(() => {
        if (localVocabSet.vocabData.length === 0) {
            const newVocabSet: IVocabSet = { ...props.vocabSet, vocabData: [getEmptyVocab(1)] }
            setLocalVocabSet(newVocabSet)
        }
        }, [props.vocabSet.vocabData])

    return (
        <>
            <Input
                labelName="set name"
                componentName="setName"
                value={localVocabSet.name}
                onChange={setName}
            />
            {localVocabSet.vocabData.map((val) =>
                <EditVocabRow key={buildComponentKey(val.id, "EditVocabRow")} vocab={val} handleVocabUpdate={handleVocabUpdate} />
            )}
            <button onClick={handleOnSave}>Save</button>
        </>
    )
}

export default EditVocabSetView