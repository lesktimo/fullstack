import React from 'react'
import { ListGroup, Grid, Row, Col } from 'react-bootstrap'
import { ListGroupItem } from 'react-bootstrap'
import {BrowserRouter as Router, Route, Link } from 'react-router-dom'

const Menu = () => (
  <div>    
    <Link to='/'>anecdotes</Link>&nbsp;
    <Link to='/create'>create new</Link>&nbsp;
    <Link to='/about'>about</Link>&nbsp;
  </div>
)

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ListGroup>
      {anecdotes.map(anecdote => 
        <ListGroupItem key={anecdote.id} >
          <Link to={`/anecdotes/${anecdote.id}`}>
            {anecdote.content}
          </Link>
        </ListGroupItem>)}
    </ListGroup>  
  </div>
)

const Anecdote = ({ anecdote }) => (
  <div>
    <h2>{anecdote.content} by {anecdote.author}</h2>
    <div>
      <p>
        has {anecdote.votes} votes
      </p>
      <p>
        for more info see <a href={anecdote.info}>{anecdote.info}</a>
      </p>
    </div>
  </div> 
)

const About = () => (
 <Grid>
    <Row>
      <Col sm={6} md={3}>
       <div>
        <h2>About anecdote app</h2>
       </div>
      </Col>
    </Row>
    <Row>
      <Col sm={6} md={3}>
        <div>
          <p>According to Wikipedia:</p>
    
          <em>An anecdote is a brief, revealing account of an individual person or an incident. 
              Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself, 
              such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative. 
              An anecdote is "a story with a point."</em>

          <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
        </div>
      </Col>
      <Col sm={6} md={3}>
        <div>
          <img src="https://fthmb.tqn.com/UUmGGkvE0esFBvgyIyd99znm8uY=/768x0/filters:no_upscale()/Al-Khwarizmi-head-5693a8955f9b58eba491f07c.jpg" alt="Al-Khwarizmi" height="100%" width="100%"/>
        </div>
      </Col>
    </Row>
 </Grid>
)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://courses.helsinki.fi/fi/TKT21009/121540749'>Full Stack -sovelluskehitys</a>.

    See <a href='https://github.com/mluukkai/routed-anecdotes'>https://github.com/mluukkai/routed-anecdotes</a> for the source code. 
  </div>
)

class CreateNew extends React.Component {
  constructor() {
    super()
    this.state = {
      content: '',
      author: '',
      info: ''
    }
  }

  handleChange = (e) => {
    console.log(e.target.name, e.target.value)
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.addNew({
      content: this.state.content,
      author: this.state.author,
      info: this.state.info,
      votes: 0
    })
  }

  render() {
    return(
      <div>
        <h2>create a new anecdote</h2>
        <form onSubmit={this.handleSubmit}>
          <div>
            content 
            <input name='content' value={this.state.content} onChange={this.handleChange} />
          </div>
          <div>
            author
            <input name='author' value={this.state.author} onChange={this.handleChange} />
          </div>
          <div>
            url for more info
            <input name='info' value={this.state.info} onChange={this.handleChange} />
          </div> 
          <button>create</button>
        </form>
      </div>  
    )

  }
}

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      anecdotes: [
        {
          content: 'If it hurts, do it more often',
          author: 'Jez Humble',
          info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
          votes: 0,
          id: '1'
        },
        {
          content: 'Premature optimization is the root of all evil',
          author: 'Donald Knuth',
          info: 'http://wiki.c2.com/?PrematureOptimization',
          votes: 0,
          id: '2'
        }
      ],
      notification: ''
    } 
  }

  addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    this.setState({ anecdotes: this.state.anecdotes.concat(anecdote) })
  }

  anecdoteById = (id) =>
    this.state.anecdotes.find(a => a.id === id)

  vote = (id) => {
    const anecdote = this.anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    const anecdotes = this.state.anecdotes.map(a => a.id === id ? voted : a)

    this.setState({ anecdotes })
  }

  render() {
    return (
      <div className="container">
        <Router>
          <div>
            <h1>Software anecdotes</h1>
              <Menu />
              <Route exact path="/" render={() => <AnecdoteList anecdotes={this.state.anecdotes} />} />
              <Route path="/about" render={() => <About />} />      
              <Route path="/create" render={() => <CreateNew addNew={this.addNew} />} />
              <Route exact path="/anecdotes/:id" render={({match}) =>
                <Anecdote anecdote={this.anecdoteById(match.params.id)}/>
              }/>
            <Footer />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
