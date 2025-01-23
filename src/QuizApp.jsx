import { useState, useEffect, useRef } from "react";

function QuizApp() {

    const [score, setScore] = useState(0);

    return (
        <div className="main">
            <div className="head">
                <h1 id="heading">Quiz Master</h1>
                <p>Score: {score}</p>
            </div>
            <hr />
            <p id="question">1. Lorem ipsum dolor sit consectetur.</p>
            <div id="answers">

            </div>
        </div>
    )
}

export default QuizApp;