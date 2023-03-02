const Filter = ({ applyFilter }) => {
  return (
    <div>
      filter shown with: <input onChange={applyFilter} />
    </div>
  );
};

export default Filter;
