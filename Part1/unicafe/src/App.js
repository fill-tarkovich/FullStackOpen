import { useState } from "react";
import Button from "./Button";
import Statistics from "./Statistics";

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [all, setAll] = useState([]);

  const handleGoodClick = () => {
    setGood(good + 1);
    setAll(all.concat(1));
  };

  const handleNeutralClick = () => {
    setNeutral(neutral + 1);
    setAll(all.concat(0));
  };

  const handleBadClick = () => {
    setBad(bad + 1);
    setAll(all.concat(-1));
  };
  const countAverage = () => {
    let sum = 0;
    for (let i = 0; i < all.length; i++) {
      sum = sum + all[i];
    }
    let result = sum / all.length;
    return result;
  };

  const countPositive = () => {
    let positive = 0;
    for (let i = 0; i < all.length; i++) {
      if (all[i] === 1) positive++;
    }
    return (positive / all.length) * 100 + "%";
  };

  return (
    <div>
      <h2>give feedback</h2>
      <div>
        <Button handleClick={handleGoodClick} text={"good"}></Button>
        <Button handleClick={handleNeutralClick} text={"neutral"}></Button>
        <Button handleClick={handleBadClick} text={"bad"}></Button>
      </div>
      <h2>statistics</h2>
      <Statistics
        good={good}
        bad={bad}
        neutral={neutral}
        positive={countPositive()}
        average={countAverage()}
        all={all.length}
      />
    </div>
  );
};

export default App;
