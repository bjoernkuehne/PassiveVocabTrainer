export const createRange = (start: number, end: number, arr: number[] = []): number[] =>
    start > end ? arr : createRange(start + 1, end, [...arr, start])
