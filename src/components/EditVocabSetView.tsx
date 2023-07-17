import { ChangeEvent, useState } from "react";
import IVocabSet from "../interfaces/VocabSet";
import Input from "./Input";

interface IProps {
    vocabSet: IVocabSet
}

const EditVocabSetView = (props: IProps) => {
    const [tempVocabSet, setTempVocabSet] = useState<IVocabSet>(props.vocabSet)

    const setName = (event: ChangeEvent<HTMLInputElement>) => {
        setTempVocabSet({ ...tempVocabSet, name: event.target.value })
    }

    return (
        <>
            <Input
                labelName="set name"
                componentName="setName"
                value={tempVocabSet.name}
                onChange={setName}
            />
        </>
    )
}

export default EditVocabSetView