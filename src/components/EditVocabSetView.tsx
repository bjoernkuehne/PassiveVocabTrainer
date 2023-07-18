import { ChangeEvent, useEffect, useState } from "react";
import IVocabSet from "../interfaces/VocabSet";
import Input from "./Input";
import EditVocabRow from "./EditVocabRow";
import { buildComponentKey, getEmptyVocab, getNewIdFromVocabSet } from "../utils/utils";
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

    const addRow = () => {
        // TODO: Maybe change new ID handling to "on save"
        const newID = getNewIdFromVocabSet(localVocabSet)
        const newVocab = getEmptyVocab(newID)
        setLocalVocabSet({ ...localVocabSet, vocabData: [...localVocabSet.vocabData, newVocab] })
    }

    const handleRemove = (vocab: IVocab) => {
        setLocalVocabSet({ ...localVocabSet, vocabData: localVocabSet.vocabData.filter((val) => val.id !== vocab.id) })
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
            {localVocabSet.vocabData.map((val, index) =>
                <EditVocabRow key={buildComponentKey(val.id, "EditVocabRow")} vocab={val} handleVocabUpdate={handleVocabUpdate} handleRemove={index !== 0 ? handleRemove : undefined} />
            )}
            <div className="buttonRow">
                <button onClick={addRow}>Add row</button>
                <button onClick={handleOnSave}>Save</button>
            </div>
        </>
    )
}

export default EditVocabSetView