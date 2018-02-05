import React from 'react'
import Kurssi from './components/Course'

const App = ({kurssit}) => {
    const rivit = () => kurssit.map(kurssi =>
        <ul key={kurssi.id}>
            <Kurssi kurssi={kurssi} />      
        </ul>
      )

    return (
        <div>
            {rivit()}
        </div>  
    )
}

export default App