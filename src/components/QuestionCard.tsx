import React from "react";
import { AnswerObject } from "../App";
import './QuestionCard.css'
import Button from '@mui/material/Button';

type Props = {
    answers: string[],
    questions: string,
    callback: (e: React.MouseEvent<HTMLButtonElement>) => void,
    userAnswer: AnswerObject | undefined,
    questionsNumber: number,
    totalQuestions: number
}

const QuestionCard: React.FC<Props> = ({ questions, answers, callback, userAnswer, questionsNumber, totalQuestions }) => {
    return (
        <div className="bodyCard">

            <p dangerouslySetInnerHTML={{ __html: questions }} className="perguntas"></p>
            <div className="bodySecundario">
                {answers.map((answer: any) => (
                    <div key={answer} className="divResposta">
                        <button disabled={userAnswer ? true : false} value={answer} onClick={callback} className="resposta" role="button">
                            <span dangerouslySetInnerHTML={{ __html: answer }} className="respostaa"></span>
                        </button>
                    </div>
                ))}
            </div>

        </div >
    );
}
{/* <Button  disabled={userAnswer ? true : false} value={answer} onClick={callback} className="alternativa"variant="contained"></Button> */ }

{/* <button disabled={userAnswer ? true : false} value={answer} onClick={callback} className="alternativa"> */ }


export default QuestionCard