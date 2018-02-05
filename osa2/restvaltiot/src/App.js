import React, { Component } from 'react';
import Country from './components/Country';
import axios from 'axios'


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
        countries: [],
        search: '',
        showAll: true
    }
}

  componentWillMount() {
    console.log('will mount')
      axios
        .get('https://restcountries.eu/rest/v2/all')
        .then(response => {
          console.log('promise fulfilled')
          this.setState({ countries: response.data })
        })
  }

  handleSearch = (event) => {
    this.setState({ search: event.target.value })
    if (this.state.search.length > 0) {
      this.setState({showAll: false})
    } else {
      this.setState({showAll: true})
    }
  }

  render() {
    const countriesToShow =
      this.state.showAll ?
        this.state.countries :
        this.state.countries.filter(country => country.name.includes(this.state.search))
    if (countriesToShow.length > 10) {
      return (
        <div>
          <div>
            find countries: <input
              value ={this.state.search}
              onChange={this.handleSearch}
            />
          </div>
          Too many countries, specify another filter
        </div>
      )
    }
    if (countriesToShow.length === 1) {
      return (
        <div>
          <div>
            Find countries: <input
              value ={this.state.search}
              onChange={this.handleSearch}
            />
          </div>
          <h1>{countriesToShow[0].name}</h1> 
          Population: {countriesToShow[0].population} <br/><br/>
          Capital: {countriesToShow[0].capital} <br/>
          <img src ={countriesToShow[0].flag} alt={countriesToShow[0].name} height="50%" width="50%" ></img>
        </div>
      )
    }
    return ( 
     <div>
        <div>
          find countries: <input
            value ={this.state.search}
            onChange={this.handleSearch}
          />
        </div>
        <div>
          {countriesToShow.map(country => <Country key={country.name} country={country} />)}
        </div>
      </div>
    )
  }

}

export default App;
