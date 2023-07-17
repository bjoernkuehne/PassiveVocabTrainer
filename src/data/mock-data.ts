import IVocab from "../interfaces/Vocab";
import { createRange } from "../utils/utils";

const createMockVocab = (id: number): IVocab => {
    return {
        id,
        targetLanguage: `Target Nr. ${id}`,
        translation: `Translation Nr. ${id}`,
        timesSeen: 0
    }
}

export const MockVocabData: IVocab[] =
    createRange(1, 10)
        .map(createMockVocab)