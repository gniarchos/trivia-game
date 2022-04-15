import React from 'react'

export default function Start(props) {

    const styles = {
        background: props.numQuestions === 0 ? "#9ba0bd" : "#4D5B9E",
        cursor: props.numQuestions === 0 ? "not-allowed" : "pointer"
    }

    return (
        <div className='wrapper'>
            <div className='title-div'>
                <h1 className='title'>Trivia Game</h1>
                <h3 className='subtitle'>Answer questions and test your knowledge!</h3>

                <input className='numberQuestions' type="number" min="1" onChange={(e) =>props.handleChangeNumber(e)} placeholder='Set number of questions'></input>

                <select onChange={(e) =>props.handleChangeCategory(e)} name="categories" className='category-options'>
                    <option className="first-selection" value="any">Set Category (Default: Any)</option>
                    <option value="10">Entertainment: Books</option>
                    <option value="11">Entertainment: Film</option>
                    <option value="12">Entertainment: Music</option>
                    <option value="13">Entertainment: Musicals &amp; Theatres</option>
                    <option value="14">Entertainment: Television</option>
                    <option value="15">Entertainment: Video Games</option>
                    <option value="16">Entertainment: Board Games</option>
                    <option value="17">Science &amp; Nature</option>
                    <option value="18">Science: Computers</option>
                    <option value="19">Science: Mathematics</option>
                    <option value="20">Mythology</option>
                    <option value="21">Sports</option>
                    <option value="22">Geography</option>
                    <option value="23">History</option>
                    <option value="24">Politics</option>
                    <option value="25">Art</option>
                    <option value="26">Celebrities</option>
                    <option value="27">Animals</option>
                    <option value="28">Vehicles</option>
                    <option value="29">Entertainment: Comics</option>
                    <option value="30">Science: Gadgets</option>
                    <option value="31">Entertainment: Japanese Anime &amp; Manga</option>
                    <option value="32">Entertainment: Cartoon &amp; Animations</option>
                </select>

                <select onChange={(e) =>props.handleChangeDifficulty(e)} name="categories" className='category-options'>
                    <option value="any">Set Difficulty (Default: Any)</option>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                </select>

                <button style={styles} className="start-btn" onClick={props.handleClick}>Start quiz</button>
            </div>
        </div>
    )
}