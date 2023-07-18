import { getExampleVocabSet } from "../data/mock-data";
import { ILocalStorageState } from "../interfaces/LocalStorageState";
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
    base * 10 * countCharsInVocab(vocab) + 5000


export const getEmptyVocab = (id: number): IVocab => (
    { id, targetLanguage: "", translation: "", timesSeen: 0 }
)

export const getEmptyVocabSet = (id: number): IVocabSet => (
    { id, name: "", vocabData: [] }
)

export const getEmptyLocalStorageState = (): ILocalStorageState => (
    {
        version: 0.1,
        data: { vocabSets: [getExampleVocabSet(1, "Example Set")] }
    }
)

export const saveInLocalStorage = (localStorageState: ILocalStorageState): void =>
    localStorage.setItem("passiveVocabTrainer", JSON.stringify(localStorageState))

export const loadFromLocalStorage = (): ILocalStorageState => {
    const maybeString: string | null = localStorage.getItem("passiveVocabTrainer")

    // Add type and data check for parsed data
    return maybeString ? JSON.parse(maybeString) : getEmptyLocalStorageState()
}

export const getNewIdFromLocalStorageState = (localStorageState: ILocalStorageState): number =>
    localStorageState.data.vocabSets.length > 0
        ? Math.max(...localStorageState.data.vocabSets.flatMap((val) => val.id)) + 1 || 1
        : 1

export const getNewIdFromVocabSet = (vocabSet: IVocabSet): number =>
    vocabSet.vocabData.length > 0
        ? Math.max(...vocabSet.vocabData.flatMap((val) => val.id)) + 1 || 1
        : 1

export const doesVocabSetContainID = (localStorageState: ILocalStorageState, id: number): boolean =>
    localStorageState.data.vocabSets.some((val) => val.id === id)