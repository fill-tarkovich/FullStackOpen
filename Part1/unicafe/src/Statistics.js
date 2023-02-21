import StatisticLine from "./StatisticLine";

const Statistics = ({ good, neutral, bad, all, average, positive }) => {
  if (all > 0) {
    return (
      <table>
        <StatisticLine text={"good"} value={good} />
        <StatisticLine text={"neutral"} value={neutral} />
        <StatisticLine text={"bad"} value={bad} />
        <StatisticLine text={"all"} value={all} />
        <StatisticLine text={"average"} value={average} />
        <StatisticLine text={"positive"} value={positive} />
      </table>
    );
  }
  return <p>No feedback given</p>;
};

export default Statistics;
