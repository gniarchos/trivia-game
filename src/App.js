import React from 'react'
import Start from './components/Start'
import Background from "./components/Background"
import Quiz from './components/Quiz'
import Button from './components/Button'
import {nanoid} from "nanoid"
import arrayShuffle from 'array-shuffle'
import Confetti from 'react-confetti'
import { Icon } from '@iconify/react'
import { GridLoader } from 'react-spinners'

export default function App() {

    const [isStarted, setIsStarted] = React.useState(false)
    const [gameEnded, setGameEnded] = React.useState(false)
    const [message, setMessage] = React.useState("")
    const [finished, setFinished] = React.useState(false)
    const [loader, setLoader] = React.useState(false)
    const [number, setNumber] = React.useState(0)
    const [category, setCategory] = React.useState("any")
    const [difficulty, setDifficulty] = React.useState("any")
    const [legend, setLegend] = React.useState(false)
    const [numberCorrect, setNumberCorrect] = React.useState(0)
    localStorage.setItem("correctAnswersNum", "null")
    const [isLoading, setIsLoading] = React.useState(true)


    function fetchNumberQuestions(event) {
        const {value} = event.target
        if ([value] == "")
        {
            setNumber(0)
        }
        else
        {
            setNumber([value])
        }
        
    }

    function fetchCategory(event) {
        const {value} = event.target
        if ([value] == "any")
        {
            setCategory("any")
        }
        else
        {
            setCategory([value])
        }
        
    }

    function fetchDifficulty(event) {
        const {value} = event.target
        if ([value] == "any")
        {
            setDifficulty("any")
        }
        else
        {
            setDifficulty([value])
        }
        
    }

    function createNewGame() {
        console.log("Creating new game. . .")
        if (number != 0)
        {
            setIsStarted(oldIsStarted => oldIsStarted = true) 
            setLoader(oldLoader => oldLoader = true)
        }
          
    }

    function startNewGame() {
        console.log("Starting new game. . .")
        setIsStarted(oldIsStarted => oldIsStarted = !oldIsStarted)
        setGameEnded(oldGameEnded => oldGameEnded = !oldGameEnded)
        setNumber(0)  
        setCategory("any")
        setDifficulty("any")
        localStorage.setItem("correctAnswersNum", "null")
        setNumberCorrect(0)
    }

    function showResults() {
        console.log("Showing results. . .")
        setGameEnded(oldVal => oldVal = true)
    }

    const [questions, setQuestions] = React.useState([{
        id: null,
        question: "", 
        correct_answer: "", 
        answers: [], 
        category: "", 
        difficulty: "", 
        type: ""
    }])

    React.useEffect(() => {
        setMessage(oldMessage => oldMessage = localStorage.getItem("correctAnswers"))
        setNumberCorrect(oldNumberCorrect =>  oldNumberCorrect = localStorage.getItem("correctAnswersNum"))
        // setFinished(prevFinished => prevFinished = localStorage.getItem("finished"))   
    }, [gameEnded])

    React.useEffect(() => {
        
            // fetch(`https://opentdb.com/api.php?amount=${number}`)
            var api = ""

            if (category === "any")
            {
                if (difficulty === "any")
                {
                    api = `https://opentdb.com/api.php?amount=${number}`
                }
                else 
                {
                    api = `https://opentdb.com/api.php?amount=${number}&difficulty=${difficulty}`
                }
                
            }
            else
            {
                if (difficulty === "any")
                {
                    api = `https://opentdb.com/api.php?amount=${number}&category=${category}`
                }
                else 
                {
                    api = `https://opentdb.com/api.php?amount=${number}&category=${category}&difficulty=${difficulty}`
                }       
            }

            setIsLoading(true)

            fetch(api)
                .then(res => res.json())
                .then(data => {
                    
                    setQuestions(data.results.map(item => ({
                    key: nanoid(),
                    question: item.question,
                    correct_answer: item.correct_answer,
                    category: item.category,
                    difficulty: item.difficulty,
                    type: item.type,
                    answers: arrayShuffle(item.incorrect_answers.concat(item.correct_answer)),
                    // handleSelected: handleSelected
                })))

                setIsLoading(false)

            })

    }, [isStarted])

    // React.useEffect(() => {
    //     fetch("https://opentdb.com/api.php?amount=3")
    //     .then(res => res.json())
    //     .then(data => setQuestions(data.results))

    // }, [])

    // console.log(questions)
    function gotoGithub() {
        window.location.href='https://github.com/gniarchos/trivial-game'
    }

    const override = `
    display: block;
    margin: 0 auto;
  `;

    return (
        <main> 
            {isStarted === false && <div className='github-main'>
                <Icon onClick={gotoGithub} className='git-img' icon="ant-design:github-filled" width="29" />
            </div>}
                
            {String(numberCorrect).valueOf() === String(number).valueOf() && <Confetti />}
            <Background />
            {isStarted === false && <Start handleClick= {createNewGame} handleChangeNumber={fetchNumberQuestions} handleChangeCategory={fetchCategory} handleChangeDifficulty={fetchDifficulty} numQuestions={number}/>}

            {/* {loader == true && <div className='loader'><BallTriangle color="#293264" height={120} width={120} /></div>} */}
            {isStarted === true && isLoading === true && 
                <div className='loader-div'>
                    <GridLoader color={'#293264'} css={override} size={40}/>
                    <h2 style={{color: "#293264"}} >Please wait. . . </h2>
                </div>}
            {isStarted === true && isLoading === false && <Quiz Data={questions} ended={gameEnded} numQuestions={number}/>}
            {isStarted === true && isLoading === false && <Button ended= {gameEnded} startNewGame = {startNewGame} showResults = {showResults} />}

            {gameEnded === true && <div align="center">
               <h3 className='correct-answers'>{message}</h3>
               {String(numberCorrect).valueOf() === String(number).valueOf() && <h3 className='correct-answers-all'>Congratulations! You answered all the questions correctly!!</h3>}
            </div>}


            

        </main>
    )
}