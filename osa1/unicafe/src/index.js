import React from 'react'
import ReactDOM from 'react-dom'

const Title = (props) => (
  <div>
    <h1>{props.title}</h1>
  </div>
)

const Statistics = (props) => (
  <div>
    <table>
      <tbody>
          <Statistic stat={props.reviews[0]} given={props.given[0]} />
          <Statistic stat={props.reviews[1]} given={props.given[1]} />
          <Statistic stat={props.reviews[2]} given={props.given[2]} />
          <Statistic stat="average" given={props.av.toFixed(1)} />
          <Statistic stat="positive" given={props.pos.toFixed(1)} />
      </tbody>
    </table>
  </div>
)
const Statistic = (props) => (
  <tr>
    <td>{props.stat}:</td>
    <td> {props.given}</td>
  </tr>
)

const Button = (props) => (
    <button onClick={props.func}>{props.text}</button>
)

class  App extends React.Component {
  constructor() {
    super()
    this.state = {
      good: 0,
      neutral: 0,
      bad: 0
    }
    this.goodReview = this.goodReview.bind(this);
    this.neutralReview = this.neutralReview.bind(this);
    this.badReview = this.badReview.bind(this);
  } 

  goodReview = () => {
    this.setState({ good: this.state.good + 1 })
  }

  neutralReview = () => {
    this.setState({ neutral: this.state.neutral + 1 })
  }

  badReview = () => {
    this.setState({ bad: this.state.bad + 1 })
  }

  render() {
    const title1="Please, give feedback"
    const title2="Statistics"
    const reviews = ["good", "neutral", "bad"]
    const given = [this.state.good, this.state.neutral, this.state.bad]
    let n = given[0] + given[1] + given[2]
    let av = ((given[0] * 1) + (given[1] * 0)  + (given[2] * -1)) / n
    let pos = given[0] / n * 100
    return(
      <div>
        <Title title={title1} />
        <div>
          <Button func={this.goodReview} text={reviews[0]} />
          <Button func={this.neutralReview} text={reviews[1]} />
          <Button func={this.badReview} text={reviews[2]} />
        </div>
        <Title title={title2} />
        {n ? (
          <Statistics reviews={reviews} given={given} av={av} pos={pos} />
        ) : (
          <p>No feedback given</p>
        )}
      </div>
    )
  }
} 
  
ReactDOM.render(
  <App />,
  document.getElementById('root')
)