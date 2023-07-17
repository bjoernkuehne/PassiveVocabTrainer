import IVocabSet from "../interfaces/VocabSet"

export const createRange = (start: number, end: number, arr: number[] = []): number[] =>
    start > end ? arr : createRange(start + 1, end, [...arr, start])


export const getVocabIDsFromSet = (vocabSet: IVocabSet): number[] =>
    vocabSet.vocabData.flatMap((val) => val.id)
