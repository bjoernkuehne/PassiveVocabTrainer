import IVocabSet from "./VocabSet"

export interface ILocalStorageState {
    version: number
    data: {
        vocabSets: IVocabSet[]
    }
}