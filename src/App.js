import React from 'react';
import './App.css';
import Form from './components/Form'

export default function App() {
  return (
    <div 
    className="App" 
    style={{
      display:'flex', 
      justifyContent: 'center', 
      alignItems: 'center',
      height: '100vh'}}>

      <Form />

    </div>
  )
}

