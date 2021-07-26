import React, {useEffect, useState} from 'react';
import './App.css';
import axios from 'axios';
import { DragDropContext } from 'react-beautiful-dnd';
import Column from './Column';

function App() {
  const [rbs, setRbs] = useState([]);
  console.log('rbs', rbs)

  useEffect(() => {
    axios.get('http://localhost:3001/rbs')
      .then(res => setRbs(res.data))
  }, [])

  const onDragEnd = () => {
    //TODO: update column order
  }

  return (
    <div className="App">
      <h3>Single list</h3>
      <DragDropContext onDragEnd={onDragEnd}>
        {rbs.map(rb => {
          return <Column key={rb.id} rb={rb} />
        })}
      </DragDropContext>
    </div>
  )
}

export default App;