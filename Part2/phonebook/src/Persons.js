const Persons = ({ filtered }) => {
  return filtered.map((person) => (
    <li key={person.name}>
      {person.name} {person.number}
    </li>
  ));
};

export default Persons;
