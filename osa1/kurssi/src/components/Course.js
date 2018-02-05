import React from 'react'

const Kurssi = ({ kurssi }) => {
    const rivit = () => kurssi.osat.map(osat =>
        <li key={osat.id}>
          {osat.nimi} {osat.tehtavia}
        </li>
      )

      const yht = kurssi.osat.reduce(function(total, amount){
        return total + amount.tehtavia;
      },0)

      return (
            <div>
                <h1>{kurssi.nimi}</h1>
                {rivit()}
                <p>Yhteensä {yht} tehtävää</p>
            </div>
        )
}

export default Kurssi

