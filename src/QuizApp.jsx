import { useState, useEffect, useRef } from "react";
import _ from "lodash"

function QuizApp() {

    const [score, setScore] = useState(0);
    const [data, setData] = useState(null);
    const [answers, setAnswers] = useState(null);
    const [index, setIndex] = useState(0);

    // fetching api on mount

    const fetchData = async () => {
        const URL = "https://opentdb.com/api.php?amount=10";
        const res = await fetch(URL);
        const result = await res.json()
        setData(result)

        const correctAns = result.results[index].correct_answer;
        const incorrectAnswers = result.results[index].incorrect_answers;
        setAnswers(_.shuffle([...incorrectAnswers, correctAns]))
    }

    useEffect(() => {
        fetchData()
    }, [])

    function decode(text) {
        const textArea = document.createElement("textarea");
        textArea.innerHTML = text;
        return textArea.value;
    }


    function checkAnswer(ele) {
        const answers = document.querySelectorAll(".answer")
        if (ele.target.innerText === data.results[index].correct_answer) {
            ele.target.style.backgroundColor = "green"
            setScore(score + 1)
        }
        else {
            ele.target.style.backgroundColor = "red"
        }
        answers.forEach((ans) => {
            ans.style.cursor = "not-allowed"
            ans.style.pointerEvents = 'none'
        })
        document.querySelector("#next-btn").hidden = false
    }

    function nextQuestion() {
        console.log(index);
        if(index >= 9){
            const nextBtn = document.querySelector("#next-btn")
            nextBtn.innerText = "Completed Quiz"
        }else{
            const indx = index+1
            setIndex((i) => i+1);
            const correctAns = data.results[indx].correct_answer;
            const incorrectAnswers = data.results[indx].incorrect_answers;
            setAnswers(_.shuffle([...incorrectAnswers, correctAns]))
            const answers = document.querySelectorAll(".answer")
            answers.forEach((ans) => {
                ans.style.cssText = ''
            })
            document.querySelector("#next-btn").hidden = true
        }
    }


    return (
        <div className="main">
            <div className="head">
                <h1 id="heading">Quiz Master</h1>
                <p>Score: {score}</p>
            </div>
            <hr />
            <p id="question">{data === null ? " Loading..." : decode(data.results[index].question)}</p>
            <div id="answers">
                {answers &&
                    answers.map((val, i) => (
                        <button 
                            key={i} 
                            className="answer" 
                            onClick={(target) => checkAnswer(target)}>{decode(val)}</button>
                    ))}
            </div>
            <div className="next">
                <button id="next-btn" onClick={nextQuestion} hidden>Next</button>
            </div>
        </div>
    )
}

export default QuizApp;