import Question from "./Question";

export interface ContextDto {
    questions: Question[]
    openQuiz: () => Promise<boolean>
}