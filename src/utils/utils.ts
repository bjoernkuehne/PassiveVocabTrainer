import IVocab from "../interfaces/Vocab";
import IVocabSet from "../interfaces/VocabSet"

export const createRange = (start: number, end: number, arr: number[] = []): number[] =>
    start > end ? arr : createRange(start + 1, end, [...arr, start])


export const getVocabIDsFromSet = (vocabSet: IVocabSet): number[] =>
    vocabSet.vocabData.flatMap((val) => val.id)


export const getRandomInt = (min: number, max: number): number =>
    Math.floor(Math.random() * (max - min)) + min;

export const randomizeNumberArray = (input: number[], result: number[] = []): number[] => {
    if (input.length <= 0) return result

    const randPos = getRandomInt(0, input.length)
    const maybeID = input.find((_, index) => index === randPos)
    const filteredInput = input.filter((_, index) => index !== randPos)

    return maybeID
        ? randomizeNumberArray(filteredInput, [...result, maybeID])
        : result
}

export const buildComponentKey = (int: number, componentName: string): string =>
    `${int}_${componentName}`

const countCharsInVocab = (vocab: IVocab): number =>
    (vocab.targetLanguage + vocab.translation).trim().length

export const calcTimeOut = (base: number, vocab: IVocab): number =>
    base * 10 * countCharsInVocab(vocab)
