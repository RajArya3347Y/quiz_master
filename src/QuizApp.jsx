import { useState, useEffect, useRef } from "react";

function QuizApp() {

    const [score, setScore] = useState(0);
    const [data, setData] = useState(null);

    // fetching api on mount

    const fetchData = async () => {
        const URL = "https://opentdb.com/api.php?amount=10";
        const res = await fetch(URL);
        setData(await res.json());
    }
    
    console.log(data)

    useEffect(() => {
        fetchData()
    }, [])


    return (
        <div className="main">
            <div className="head">
                <h1 id="heading">Quiz Master</h1>
                <p>Score: {score}</p>
            </div>
            <hr />
            <p id="question">{data === null ? " Loading..." : data.results[0].question}</p>
            <div id="answers">

            </div>
        </div>
    )
}

export default QuizApp;