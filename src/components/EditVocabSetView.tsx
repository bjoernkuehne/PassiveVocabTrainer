import { ChangeEvent, useState } from "react";
import IVocabSet from "../interfaces/VocabSet";
import Input from "./Input";

interface IProps {
    vocabSet: IVocabSet
    saveSet: (vocabSet: IVocabSet) => void
}

const EditVocabSetView = (props: IProps) => {
    const [tempVocabSet, setTempVocabSet] = useState<IVocabSet>(props.vocabSet)

    const setName = (event: ChangeEvent<HTMLInputElement>) => {
        setTempVocabSet({ ...tempVocabSet, name: event.target.value })
    }

    const handleOnSave = () => {
        props.saveSet(tempVocabSet)
    }

    return (
        <>
            <Input
                labelName="set name"
                componentName="setName"
                value={tempVocabSet.name}
                onChange={setName}
            />
            <button onClick={handleOnSave}>Save</button>
        </>
    )
}

export default EditVocabSetView