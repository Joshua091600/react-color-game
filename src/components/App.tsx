import { useState, useEffect, useMemo, useCallback } from 'react'
import '../styles/app.css'
const CHOICES_QTY = 3;
const MSG_CORRECT = 'Correct!'
const MSG_WRONG = 'Wrong!'
type ColorChoice = {
  color: string,
  isCorrectAnswer: boolean
}

const randomHexColor = (): string => {
  let n = (Math.random() * 0xfffff * 1000000).toString(16);
  return ('#' + n.slice(0, 6)).toUpperCase();
}

const generateChoices = (choiceQty: number): ColorChoice[] => {
  const colors: string[] = []

  for(let i = 0; i < choiceQty; i++) {
    var color = ''

    while(true) {
      color = randomHexColor()
      if (!colors.includes(color)) break
    }
    colors.push(color)
  }
  let choices: ColorChoice[] = colors.map(color => ({color: color, isCorrectAnswer: false}))
  choices[Math.floor(Math.random() * choiceQty)].isCorrectAnswer = true

  return choices
}

const App = () => {
  const [score, setScore] = useState(0)
  const [choices, setChoices] = useState(generateChoices(CHOICES_QTY))
  const [display, setDisplay] = useState('')
  const correctAnswerColor = useMemo(() => choices.filter(choice => choice.isCorrectAnswer)[0].color, [choices])
  const checkAnswer = useCallback((answer: string, element: HTMLElement) => {
    if(answer === correctAnswerColor) {
      setScore(score + 1)
      setDisplay(MSG_CORRECT)
      return
    }
    element.setAttribute('disabled', 'true')
    setDisplay(MSG_WRONG)
  },[correctAnswerColor])

  useEffect(() => {
    setChoices(generateChoices(CHOICES_QTY))
  }, [score])

  const style = {
    backgroundColor: correctAnswerColor
  }

  return (
    <div className="container">
      <div className="score">Score: {score.toString()}</div>
      <div className="color-display" style={style}/>
      <div 
      className="answer-display" 
      style={{"color": ((display !== '' && display === MSG_CORRECT) ? '#4F8A10' : '#D8000C')}}
      >
        {display}
      </div>
      <div className="choices">
        {choices.map(choice => {
          return (
            <button 
            key={choice.color}
            className="choice"
            type="button"
            onClick={(e) => checkAnswer(choice.color, e.currentTarget)}
            >
              {choice.color}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default App
