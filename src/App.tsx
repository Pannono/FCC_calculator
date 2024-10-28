import { useState } from 'react';
import './App.css';

function App() {
  const [answer, setAnswer] = useState("");
  const [expression, setExpression] = useState("");
  const [isResult, setIsResult] = useState(false); // Flag per gestire nuovo calcolo dopo "="

  const isOperator = (symbol) => /[*/+-]/.test(symbol);

  const buttonPress = (symbol) => {
    if (symbol === "clear") {
      setAnswer("");
      setExpression("0");
      setIsResult(false);
      return;
    }

    if (isResult && isOperator(symbol)) {
      setExpression(answer + " " + symbol + " ");
      setIsResult(false);
      return;
    }

    if (symbol === "negative") {
      if (answer === "") return;
      setAnswer(answer.charAt(0) === "-" ? answer.slice(1) : "-" + answer);
      return;
    }

    if (symbol === "percent") {
      if (answer === "") return;
      setAnswer((parseFloat(answer) / 100).toString());
      return;
    }

    if (symbol === "=") {
      calculate();
      return;
    }

    if (isOperator(symbol)) {
      // Gestione operatori consecutivi, mantenendo solo l'ultimo operatore inserito
      if (isOperator(expression.trim().slice(-1))) {
        if (symbol === "-" && expression.trim().slice(-2, -1) !== "-") {
          setExpression(expression + symbol); // Aggiungi il "-" come segno negativo
        } else {
          // Rimuovi gli operatori precedenti e sostituisci con il nuovo
          setExpression(expression.replace(/[*+/ -]+$/, " " + symbol + " "));
        }
      } else {
        setExpression(expression + " " + symbol + " ");
      }
      return;
    }

    if (symbol === "0") {
      if (expression === "0") return;
      setExpression(expression + symbol);
      return;
    }

    if (symbol === ".") {
      const lastNumber = expression.split(/[-+/*]/).pop();
      if (!lastNumber.includes(".")) {
        setExpression(expression + symbol);
      }
      return;
    }

    if (expression === "0" && symbol !== ".") {
      setExpression(symbol);
    } else {
      setExpression(expression + symbol);
    }

    setIsResult(false);
  };

  const calculate = () => {
    if (isOperator(expression.trim().slice(-1))) return;

    try {
      const result = eval(expression.replace(/\s+/g, "")); // Rimuovi spazi prima del calcolo
      setAnswer(result.toString());
      setExpression("");
      setIsResult(true);
    } catch {
      setAnswer("Error");
    }
  };

  return (
    <div className='container'>
      <h1>Calculator Application</h1>
      <div id='calculator'>
        <div id="display" style={{ textAlign: "right" }}>
          <div id="answer">{answer}</div>
          <div id="expression">{expression}</div>
        </div>
        <button id="clear" onClick={() => buttonPress("clear")} className="light-gray">C</button>
        <button id="negative" onClick={() => buttonPress("negative")} className="light-gray">+/-</button>
        <button id="percentage" onClick={() => buttonPress("percent")} className="light-gray">%</button>
        <button id="divide" onClick={() => buttonPress("/")} className="yellow">/</button>
        <button id="seven" onClick={() => buttonPress("7")} className="dark-gray">7</button>
        <button id="eight" onClick={() => buttonPress("8")} className="dark-gray">8</button>
        <button id="nine" onClick={() => buttonPress("9")} className="dark-gray">9</button>
        <button id="multiply" onClick={() => buttonPress("*")} className="yellow">*</button>
        <button id="four" onClick={() => buttonPress("4")} className="dark-gray">4</button>
        <button id="five" onClick={() => buttonPress("5")} className="dark-gray">5</button>
        <button id="six" onClick={() => buttonPress("6")} className="dark-gray">6</button>
        <button id="subtract" onClick={() => buttonPress("-")} className="yellow">-</button>
        <button id="one" onClick={() => buttonPress("1")} className="dark-gray">1</button>
        <button id="two" onClick={() => buttonPress("2")} className="dark-gray">2</button>
        <button id="three" onClick={() => buttonPress("3")} className="dark-gray">3</button>
        <button id="add" onClick={() => buttonPress("+")} className="yellow">+</button>
        <button id="zero" onClick={() => buttonPress("0")} className="dark-gray">0</button>
        <button id="decimal" onClick={() => buttonPress(".")} className="dark-gray">.</button>
        <button id="equals" onClick={() => buttonPress("=")} className="yellow">=</button>
      </div>
    </div>
  );
}

export default App;
