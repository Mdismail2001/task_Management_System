import { useState } from 'react'
import './App.css'
import { Outlet } from 'react-router'

function App() {

  return (
    <>
    <h1 className='text-amber-300'>task management</h1>
    <Outlet></Outlet>
    </>
  )
}

export default App
