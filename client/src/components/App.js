import React, {useEffect, useState} from 'react';
import './App.css';
import axios from 'axios';
import { DragDropContext } from 'react-beautiful-dnd';
import Column from './Column';

function App() {
  const [rbs, setRbs] = useState([]);

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
        <Column players={rbs} title='RBs'/>
      </DragDropContext>
    </div>
  )
}

export default App;