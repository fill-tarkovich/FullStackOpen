import { useState, useEffect } from "react";
import Filter from "./Filter";
import Form from "./Form";
import Persons from "./Persons";
import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filtered, setFiltered] = useState([]);
  const [isFiltered, setIsFiltered] = useState(false);

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const addPerson = (event) => {
    event.preventDefault();
    const newPerson = {
      name: newName,
      number: newNumber,
    };
    JSON.stringify(persons).includes(JSON.stringify(newPerson.name))
      ? alert(`${newName} is already added to phonebook`)
      : personService.create(newPerson).then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson));
        });
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
    setFiltered(persons);
    const value = event.target.value;
    const filteredPersons = persons.filter((person) =>
      JSON.stringify(person.name).toLowerCase().includes(value.toLowerCase())
    );
    setFiltered(filteredPersons);
    setIsFiltered(true);
  };

  const deleteHandler = (person) => {
    const id = person.id;
    if (window.confirm(`Delete ${person.name}?`)) {
      personService.deleteEntry(id);
      setPersons(persons.filter((person) => person.id !== id));
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter applyFilter={applyFilter} />
      <h2>add a new</h2>
      <Form
        addPerson={addPerson}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        newName={newName}
        newNumber={newNumber}
      />
      <h2>Numbers</h2>
      <Persons
        persons={isFiltered ? filtered : persons}
        deleteHandler={deleteHandler}
      />
    </div>
  );
};

export default App;
