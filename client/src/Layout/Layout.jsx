import React, {useState, useEffect} from 'react'
import sytled from 'styled-components'

import Header from './Header/Header'
import Main from './Main/Main'
import Footer from './Footer/Footer'

const Layout = () => {
  const [clones, setClones] = useState([])
  useEffect(() => {
    console.log('clones', clones)
    return () => {}
  }, [clones])
  const cloneProps = {
    clones,
    setClones
  }
  return <LayoutStyle className="Layout">
      <Header />
      <Main {...cloneProps} />
      <Footer {...cloneProps} />
    </LayoutStyle>
}

export default Layout

const LayoutStyle = sytled.div`
  width: 90vw;
  // height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: yellow;
`
