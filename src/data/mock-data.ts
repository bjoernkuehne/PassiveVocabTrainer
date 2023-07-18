import IVocab from "../interfaces/Vocab";
import IVocabSet from "../interfaces/VocabSet";

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