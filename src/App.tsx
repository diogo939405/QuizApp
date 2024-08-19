import { useState } from 'react'
import './App.css'
import QuestionCard from './components/QuestionCard'
import { Category, fecthQuestions, Dificulty, QuestionsState } from './Api'


export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
};

const App = () => {

  const Total_Questoes: number = 10

  const [loading, setLoading] = useState(false)
  const [questions, setQuestions] = useState<QuestionsState[]>([])
  const [number, setNumber] = useState(0)
  const [userAnswer, setUserAnswer] = useState<AnswerObject[]>([])
  const [score, setScore] = useState(0)
  const [gameOver, setGameOver] = useState(true)





  const startQuiz = async () => {

    setLoading(true)
    setGameOver(false)

    const newQuestions = await fecthQuestions(
      Total_Questoes,
      Dificulty.EASY,
      Category.SPORTS
    )
    try {
      setQuestions(newQuestions)
      setScore(0)
      setUserAnswer([])
      setNumber(0)
      setLoading(false)
    } catch (error) {
      console.log(error)
    }

  }

  const finalScore = () => {
    if (number !== Total_Questoes - 1) {
      return (
        <p></p>
      )
    } else {
      return (
        <>
          <p className='resultadoFinal'> sua pontuação foi {score}</p>
          <button onClick={resta} className='start'>Faça novamente</button>
          <br />
        </>
      )
    }
  }

  const resta = () => {
    window.location.reload()
  }

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {

    const button = e.currentTarget;
    const allButtons = document.querySelectorAll('.resposta');
    allButtons.forEach(btn => btn.classList.remove('selected'));

    button.classList.add('selected');


    if (!gameOver) {
      const answer = e.currentTarget.value

      const correct = questions[number].correct_answer === answer

      if (correct) setScore(prev => prev + 1)

      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      };
      setUserAnswer((prev) => [...prev, answerObject]);
    }
  }

  const nextQuestions = () => {
    const nextQuestions = number + 1

    if (nextQuestions === Total_Questoes) {
      setGameOver(true)
    } else {
      setNumber(nextQuestions)
    }

  }

  return (
    <>
      <div className='app'>
        <h1 className='titulo-app'>Quiz Esporte</h1>
        {
          gameOver || userAnswer.length === Total_Questoes ? (
            <button className="start" role="button" onClick={startQuiz}>Iniciar</button>
          ) : null
        }
        {!gameOver ? <p className='score'>Pontuação: {score}</p> : null}
        {loading && <p>carregando perguntas(Uso API Free, então caso demore a carregar recarregue a página)</p>}

        {!loading && !gameOver && number !== Total_Questoes - 1 ? (
          <QuestionCard
            totalQuestions={Total_Questoes}
            questionsNumber={number + 1}
            answers={questions[number].answers}
            questions={questions[number].question}
            userAnswer={userAnswer ? userAnswer[number] : undefined}
            callback={checkAnswer}
          />
        ) : finalScore()}
        {!gameOver && !loading && userAnswer.length === number + 1 && number !== Total_Questoes - 1 ? (
          <button className='next' onClick={nextQuestions}>Proxima pergunta</button>
        ) : null}




      </div>
    </>
  );
}



export default App
