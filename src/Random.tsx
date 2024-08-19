export const Random = (array: any[]) =>
    [...array].sort(() => Math.random() - 0.5)