import React from 'react'
import classes from './Layout.module.css'
import Navbar from '../components/Navbar'

const Layout = ({children}) => {
  return (
    <div className={classes.container}>
    <Navbar/>
    {children}
    </div>
  )
}

export default Layout
