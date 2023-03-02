import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filtered, setFiltered] = useState(persons);

  const addPerson = (event) => {
    event.preventDefault();
    const newPerson = {
      name: newName,
      number: newNumber,
    };
    JSON.stringify(persons).includes(JSON.stringify(newPerson.name))
      ? alert(`${newName} is already added to phonebook`)
      : setPersons(persons.concat(newPerson));
    setNewName("");
    setNewNumber("");
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const applyFilter = (event) => {
    const value = event.target.value;
    const filteredPersons = persons.filter((person) =>
      JSON.stringify(person.name).toLowerCase().includes(value.toLowerCase())
    );
    setFiltered(filteredPersons);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with: <input onChange={applyFilter} />
      </div>
      <h2>add a new</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {filtered.map((person) => (
        <li key={person.name}>
          {person.name} {person.number}
        </li>
      ))}
    </div>
  );
};

export default App;
