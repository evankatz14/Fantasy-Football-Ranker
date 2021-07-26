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

  const onDragEnd = result => {
    //TODO: update column order
    console.log('result', result)
    const {destination, source, draggableId} = result;

    if (!destination) {
      return;
    }
    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    const newRbs = [...rbs];
    newRbs.splice(source.index, 1);
    newRbs.splice(destination.index, 0, rbs[source.index]);
    console.log(newRbs)

    setRbs(newRbs);
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