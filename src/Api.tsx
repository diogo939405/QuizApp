import { Random } from "./Random";

export type Question = {
    category: number;
    correct_answer: string;
    difficulty: string;
    incorrect_answers: string[];
    question: string;
    type: string;
}

export type QuestionsState = Question & { answers: string[] };

export enum Dificulty {
    EASY = "easy",
    MEDIUM = 'medium',
    HARD = 'hard',
}

export enum Category {
    SPORTS = 21
}

export const fecthQuestions =
    async (amount: number, difficulty: Dificulty, category: Category): Promise<QuestionsState[]> => {
        const endpoint = `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=multiple`;
        const data = await (await fetch(endpoint)).json();
        console.log('teste ', data);
        return data.results.map((questions: Question) => (
            {
                ...questions,
                answers: Random([
                    ...questions.incorrect_answers,
                    questions.correct_answer]),
            }))
    };  