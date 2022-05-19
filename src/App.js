import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Form from './Form'
import Bar from './component/Bar.js'

const App = () => {
  return (
    <>
    <Routes>
       <Route exact path="/" element={<Form />} />  
       <Route path="/bar" element={<Bar />} />  
    </Routes>
    </>
  )
}

export default App;
