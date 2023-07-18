import IVocab from "../interfaces/Vocab";
import IVocabSet from "../interfaces/VocabSet";
import { createRange } from "../utils/utils";

const createMockVocab = (id: number): IVocab => (
    {
        id,
        targetLanguage: `Target Nr. ${id}`,
        translation: `Translation Nr. ${id}`,
        timesSeen: 0
    }
)

const createMockVocabData = (length: number): IVocab[] =>
    createRange(1, length)
        .map(createMockVocab)


const createMockVocabSet = (id: number, name: string, vocabDataLength: number): IVocabSet => (
    {
        id,
        name,
        vocabData: createMockVocabData(vocabDataLength)
    }
)

export const createMockVocabSets = (setsCount: number, vocabDataCount: number) =>
    createRange(1, setsCount)
        .map((id) => createMockVocabSet(id, `Set Nr. ${id}`, vocabDataCount))


const exampleData: string[][] = [
    [
        "A cat is dancing in the rain",
        "Eine Katze tanzt im Regen"
    ],
    [
        "A dog is sleeping on the chair",
        "Ein Hund schläft auf dem Stuhl"
    ],
    [
        "I would like to go to a restaurant",
        "Ich würde gerne in ein Restaurant gehen"
    ],
    [
        "This is only an example sentence",
        "Dies ist nur ein Beispielsatz"
    ]
]

const buildExampleSet = (exampleData: string[][]): IVocab[] =>
    exampleData.map(
        (val, id) => ({
            id: id + 1,
            targetLanguage: val[0],
            translation: val[1],
            timesSeen: 0
        })
    )


export const getExampleVocabSet = (id: number, name: string): IVocabSet => ({
    id, name, vocabData: buildExampleSet(exampleData)
})