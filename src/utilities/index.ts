import { IProduct } from "../interface";

export function shuffleArray(array: IProduct[]): IProduct[] {
    // Clone the array to avoid mutating the original one
    const shuffledArray = [...array];

    for (let i = shuffledArray.length - 1; i > 0; i--) {
        // Generate a random index
        const j = Math.floor(Math.random() * (i + 1));

        // Swap elements at i and j
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray.slice(0, 4);
}