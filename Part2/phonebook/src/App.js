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
  const [infoMessage, setInfoMessage] = useState(null);

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
    if (JSON.stringify(persons).includes(JSON.stringify(newPerson.name))) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with the new one?`
        )
      ) {
        const matchingPerson = persons.find(
          (person) => person.name === newName
        );
        personService
          .update(matchingPerson.id, newPerson)
          .then((returnedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id !== matchingPerson.id ? person : returnedPerson
              )
            );
            setInfoMessage(
              `Number of ${returnedPerson.name} updated successfully`
            );
          });
      }
    } else {
      personService.create(newPerson).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        setInfoMessage(`${returnedPerson.name} added successfully`);
      });
    }
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

  const Notification = ({ message }) => {
    if (message === null) {
      return null;
    } else {
      setTimeout(() => {
        setInfoMessage(null);
      }, 6000);
      return <div className="error">{message}</div>;
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={infoMessage} />
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
