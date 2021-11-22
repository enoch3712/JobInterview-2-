import Question from "./Question";

export interface QuestionsResponse {
    response_code: number;
    results: Question[];
}