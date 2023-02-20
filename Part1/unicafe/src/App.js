import { useState } from "react";
import Button from "./Button";

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGoodClick = () => {
    setGood(good + 1)
  }

   const handleNeutralClick = () => {
    setNeutral(neutral + 1)
  }

   const handleBadClick = () => {
    setBad(bad + 1)
  }

  return <div>
    <h2>give feedback</h2>
    <div>
      <Button handleClick={handleGoodClick} text={"good"}></Button>
      <Button handleClick={handleNeutralClick} text={"neutral"}></Button>
      <Button handleClick={handleBadClick} text={"bad"}></Button>
    </div>
    <h2>statistics</h2>
    <p>good {good}</p>
    <p>neutral {neutral}</p>
    <p>bad {bad}</p>
  </div>;
};

export default App;
