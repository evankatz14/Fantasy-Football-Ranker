import React, {useEffect, useState} from 'react';
import './App.css';
import axios from 'axios';
import { DragDropContext } from 'react-beautiful-dnd';
import Column from './Column';

function App() {
  const [rbs, setRbs] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/rbs')
      .then(res => {
        const rbsWithRanks = res.data.map((rb, index) => {
          return {...rb, rank: index + 1}
        })
        return setRbs(rbsWithRanks);
      })
  }, [])

  const onDragEnd = result => {
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

    newRbs.map((rb, index) => rb.rank = (index + 1));

    setRbs(newRbs);

    axios.put('http://localhost:3001/rbs', newRbs)
      .then(() => console.log('successfully updated rbs'))
      .catch(() => console.log('failed to update rbs'));
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