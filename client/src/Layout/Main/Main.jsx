import React, { useState } from 'react'
import './Main.css'

import pesci from '../../assets/pesci.jpeg'

const Pescis = ({ clones, setClones }) => {
  let [count, setCount] = useState(1)
  const handleClick = e => {
    alert(`watch who ya pokin'!!`)
    setCount(prevCount => prevCount + 1)
    setClones(prevClones => [...prevClones, count])
  }
  return [
    <Pesci handleClick={handleClick} key={0} count={0} />, 
    ...clones.map(num => <Pesci handleClick={handleClick} key={num} count={num} />)
  ]
}

const Pesci = ({count, handleClick}) => {
  return <>
    <img onClick={handleClick} className="pesci" src={pesci} alt="dis joe pesci" srcSet=""/>
    <p>{`^ dis Joe Pesci ${count}`}</p>
  </>
}

const Main = props => {
  return (
    <div className="Main">
      <Pescis {...props} />
    </div>
  )
}

export default Main
