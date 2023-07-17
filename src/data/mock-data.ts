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
