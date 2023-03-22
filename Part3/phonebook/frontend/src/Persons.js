const Persons = ({ persons, deleteHandler }) => {
  return persons.map((person) => (
    <li key={person.name}>
      {person.name} {person.number}
      <button onClick={() => deleteHandler(person)}>delete</button>
    </li>
  ));
};

export default Persons;
