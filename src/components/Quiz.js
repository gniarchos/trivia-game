import React from "react"
import { decode } from "html-entities"
import Navbar from "./Navbar"

export default function Quiz(props) {
  const [interaction, setInteraction] = React.useState(1)
  const [answers, setAnswers] = React.useState([{ isItCorrect: false }])

  const correct = props.Data.map((item) => {
    return item.correct_answer
  })

  function handleSelectedAnswer(event, index) {
    const { value } = event.target

    setInteraction((prevInteraction) => (prevInteraction = prevInteraction + 1))

    if (String([value]).valueOf() === String(correct[index]).valueOf()) {
      let items = [...answers]
      let item = { ...items[index] }
      item.isItCorrect = true
      items[index] = item
      setAnswers((oldAnswers) => (oldAnswers = items))
    } else {
      let items = [...answers]
      let item = { ...items[index] }
      item.isItCorrect = false
      items[index] = item
      setAnswers((oldAnswers) => (oldAnswers = items))
    }
  }
  var foundCorrect = 0

  React.useEffect(() => {
    if (interaction >= props.numQuestions) {
      answers.map((an) => {
        console.log(an)
        if (an.isItCorrect === true) {
          foundCorrect = foundCorrect + 1
        }
      })
      localStorage.setItem(
        "correctAnswers",
        `Correct Answers ${foundCorrect}/${props.numQuestions}`
      )
      localStorage.setItem("correctAnswersNum", foundCorrect)
    } else {
      localStorage.setItem(
        "correctAnswers",
        `You must answer all the questions to finish the game!`
      )
    }
  }, [props.ended])

  return (
    <div className="quiz-container">
      <Navbar />
      <div className="quiz-div-wrapper">
        {props.Data.map((item, index) => {
          return (
            <div className="div-quiz" key={index}>
              <h3 className="question">{decode(item.question)}</h3>

              <label>
                <input
                  type="radio"
                  disabled={props.ended === true ? true : false}
                  className="buttonGroup"
                  name={`answer option-${item.question}`}
                  id={`answer-options-${index}`}
                  value={decode(item.answers[0])}
                  onChange={(e) => handleSelectedAnswer(e, index)}
                />
                <div
                  style={{
                    backgroundColor:
                      props.ended === true &&
                      decode(item.answers[0]) === decode(item.correct_answer)
                        ? "#94D7A2"
                        : "none",
                    color:
                      props.ended === true &&
                      decode(item.answers[0]) === decode(item.correct_answer) &&
                      "white",
                    border:
                      props.ended === true &&
                      decode(item.answers[0]) === decode(item.correct_answer) &&
                      "2px solid #94D7A2",
                  }}
                >
                  {decode(item.answers[0])}
                </div>
              </label>

              <label>
                <input
                  type="radio"
                  disabled={props.ended === true ? true : false}
                  className="buttonGroup"
                  name={`answer option-${item.question}`}
                  id={`answer-options-${index}`}
                  value={decode(item.answers[1])}
                  onChange={(e) => handleSelectedAnswer(e, index)}
                />
                <div
                  style={{
                    backgroundColor:
                      props.ended === true &&
                      decode(item.answers[1]) === decode(item.correct_answer)
                        ? "#94D7A2"
                        : "none",
                    color:
                      props.ended === true &&
                      decode(item.answers[1]) === decode(item.correct_answer) &&
                      "white",
                    border:
                      props.ended === true &&
                      decode(item.answers[1]) === decode(item.correct_answer) &&
                      "2px solid #94D7A2",
                  }}
                >
                  {decode(item.answers[1])}
                </div>
              </label>

              {item.type != "boolean" && (
                <label>
                  <input
                    type="radio"
                    disabled={props.ended === true ? true : false}
                    className="buttonGroup"
                    name={`answer option-${item.question}`}
                    id={`answer-options-${index}`}
                    value={decode(item.answers[2])}
                    onChange={(e) => handleSelectedAnswer(e, index)}
                  />
                  <div
                    style={{
                      backgroundColor:
                        props.ended === true &&
                        decode(item.answers[2]) === decode(item.correct_answer)
                          ? "#94D7A2"
                          : "none",
                      color:
                        props.ended === true &&
                        decode(item.answers[2]) ===
                          decode(item.correct_answer) &&
                        "white",
                      border:
                        props.ended === true &&
                        decode(item.answers[2]) ===
                          decode(item.correct_answer) &&
                        "2px solid #94D7A2",
                    }}
                  >
                    {decode(item.answers[2])}
                  </div>
                </label>
              )}

              {item.type != "boolean" && (
                <label>
                  <input
                    type="radio"
                    disabled={props.ended === true ? true : false}
                    className="buttonGroup"
                    name={`answer option-${item.question}`}
                    id={`answer-options-${index}`}
                    value={decode(item.answers[3])}
                    onChange={(e) => handleSelectedAnswer(e, index)}
                  />
                  <div
                    style={{
                      backgroundColor:
                        props.ended === true &&
                        decode(item.answers[3]) === decode(item.correct_answer)
                          ? "#94D7A2"
                          : "none",
                      color:
                        props.ended === true &&
                        decode(item.answers[3]) ===
                          decode(item.correct_answer) &&
                        "white",
                      border:
                        props.ended === true &&
                        decode(item.answers[3]) ===
                          decode(item.correct_answer) &&
                        "2px solid #94D7A2",
                    }}
                  >
                    {decode(item.answers[3])}
                  </div>
                </label>
              )}

              <hr />
            </div>
          )
        })}
      </div>
    </div>
  )
}
