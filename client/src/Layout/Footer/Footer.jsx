
import React from 'react'



const Footer = ({ clones, setClones }) => {

  const killClones = () => console.log(`kill clones`) || setClones([])
  const killButton = <button onClick={killClones}>{`kill the clones??`}</button>
  const simpleButton = <button>{ `simple footer` }</button>
  const footerContent = clones.length > 0 ? killButton : simpleButton

return <div className="Footer">
    { footerContent }  
    <div>{` => ${ clones.length } clones`}</div>
  </div>
}

export default Footer
