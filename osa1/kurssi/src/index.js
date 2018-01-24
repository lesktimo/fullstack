import React from 'react'
import ReactDOM from 'react-dom'

const Otsikko = (props) => (
  <div>
    <h1>{props.kurssi}</h1>
  </div>
)

const Sisalto = (props) => (
  <div>
    <Osa osa={props.osat[0]} />
    <Osa osa={props.osat[1]} />
    <Osa osa={props.osat[2]} />
  </div>
)

const Osa = (props) => (
  <div>
    <p>{props.osa.nimi} {props.osa.tehtavia}</p>
  </div>
)

const Yhteensa = (props) => (
  <div>
    <p>Yhteensä {
                  props.tehtavia[0].tehtavia + 
                  props.tehtavia[1].tehtavia +
                  props.tehtavia[2].tehtavia
                } tehtävää</p>
  </div>
)

const App = () => {
  const kurssi = {
    nimi: 'Half Stack -sovelluskehitys',
    osat: [
      {
        nimi: 'Reactin perusteet',
        tehtavia: 10
      },
      {
        nimi: 'Tiedonvälitys propseilla',
        tehtavia: 7
      },
      {
        nimi: 'Komponenttien tila',
        tehtavia: 14
      }
    ]
  }
  return (
    <div>
      <Otsikko kurssi={kurssi.nimi} />
      <Sisalto osat={kurssi.osat} />
      <Yhteensa tehtavia={kurssi.osat} />
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)