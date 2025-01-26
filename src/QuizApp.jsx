import { useState, useEffect, useRef } from "react";
import _ from "lodash"

function QuizApp() {

    const [score, setScore] = useState(0);
    const [data, setData] = useState(null);
    let [answers, setAnswers] = useState(null);

    // fetching api on mount

    const fetchData = async () => {
        const URL = "https://opentdb.com/api.php?amount=10";
        const res = await fetch(URL);
        const result = await res.json()
        setData(result)


        const correctAns = result.results[0].correct_answer;
        const incorrectAnswers = result.results[0].incorrect_answers;
        setAnswers(_.shuffle([...incorrectAnswers, correctAns]))
    }

    console.log(data)

    useEffect(() => {
        fetchData()
    }, [])

    function decode(text) {
        const textArea = document.createElement("textarea");
        textArea.innerHTML = text;
        return textArea.value;
    }


    return (
        <div className="main">
            <div className="head">
                <h1 id="heading">Quiz Master</h1>
                <p>Score: {score}</p>
            </div>
            <hr />
            <p id="question">{data === null ? " Loading..." : decode(data.results[0].question)}</p>
            <div id="answers">
                {answers &&
                    answers.map((val, i) => (
                        <button key={i} className="answer">{val}</button>
                    ))}
            </div>
            <div className="next">
                <button id="next-btn">Next</button>
            </div>
        </div>
    )
}

export default QuizApp;