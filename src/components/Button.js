import React from 'react'

export default function Button(props) {

    return (
        <div className='quiz-button-div' align="center">
            {props.ended == true ? <button className='newGame-btn' onClick={props.startNewGame}>NEW GAME</button> : <button className='results-btn' onClick={props.showResults}>Check Answers</button>}
        </div>
        
    )
}