import React from 'react'
import Person from './components/Person';
import personService from './services/persons'
import Notification from './components/Notification'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            persons: [],
            newName: '',
            newNumber: '',
            filter: '',
            error: null,
            showAll: true
        }
    }

    componentDidMount() {
        console.log('will mount')
        personService
          .getAll()
          .then(persons =>{
             this.setState({persons})
        })
      }

    handleName = (event) => {
        this.setState({ newName: event.target.value })
    }

    handleNumber = (event) => {
        this.setState({ newNumber: event.target.value })
    }

    handleFilter = (event) => {
        this.setState({ filter: event.target.value })
        if (this.state.filter.length < 1) {
          this.setState({showAll: true})
        } else {
          this.setState({showAll: false})
        }
    }

    addPerson = (event) => {
        event.preventDefault()
        for(var i = 0; i < this.state.persons.length; i++){
            if(this.state.persons[i].name === this.state.newName){
                if(window.confirm('Nimi löytyi. Päivitetäänkö?')){
                    const personObject = {
                        name: this.state.newName,
                        number: this.state.newNumber
                    }
                    personService
                        .update(this.state.persons[i].id, personObject)
                        .then(newPerson => {
                            this.setState({
                                newName: '',
                                newNumber: ''
                            })
                            this.componentDidMount()
                        })
                        this.setState({
                            error: 'Yhteystieto päivitetty'
                        })
                        setTimeout(() => {
                            this.setState({
                                error: null
                            })
                        }, 5000)
                        return;
                    } else {
                        this.setState({
                            newName: '',
                            newNumber: ''
                        })
                        return;
                }
            }
        }
        const personObject = {
            name: this.state.newName,
            number: this.state.newNumber
        }
        personService.create(personObject)
        .then(newPerson => {
            this.setState({
                persons: this.state.persons.concat(newPerson),
                newName: '',
                newNumber: '',
                error: `${newPerson.name} lisätty`
            })
            setTimeout(() => {this.setState({
                error: null
            })}, 5000)
        })
    }

    deletePerson = (id) => {
        return () => {
            personService
                .deleteId(id)
                .then(deletedPerson => {
                    this.componentDidMount()
                    this.setState({
                        error: 'Henkilö poistettu'
                    })
                    setTimeout(() => {
                        this.setState({
                            error: null
                        })
                    }, 5000)
                })
                .catch(error => {
                    this.setState({
                        error: 'Henkilö on jo poistettu'
                    })
                    setTimeout(() => {
                        this.setState({
                            error: null
                        })
                    }, 5000)
                })
        }

    }

    render() {
        const filteredPersons =
            this.state.showAll ?
            this.state.persons :
            this.state.persons.filter(
                person => person.name.includes(
                    this.state.filter
                )
            )
        return (
            <div>
                <h2>Puhelinluettelo</h2>
                <Notification message={this.state.error}/>
                <form onSubmit={this.addPerson}>
                    <div>
                        nimi: <input 
                            value={this.state.newName}
                            onChange={this.handleName}
                    />
                    </div>
                    <div>
                        numero: <input 
                            value={this.state.newNumber}
                            onChange={this.handleNumber}
                        />
                    </div>
                    <div>
                        <button type="submit">lisää</button>
                    </div>
                </form>
                <h2>Numerot</h2>
                <div>
                    Hae: <input 
                        value={this.state.filter}
                        onChange={this.handleFilter}
                    />
                    <div>
                        {filteredPersons.map(person => <Person key={person.name} person={person} deletePerson={this.deletePerson(person.id)}/>)}
                    </div>
                </div>
            </div>
        )
    }
}

export default App