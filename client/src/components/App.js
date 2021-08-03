import React, {useEffect, useState} from 'react';
import './App.css';
import axios from 'axios';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import Column from './Column';

const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
  height: 75px;
`;
const Delete = styled.div``;

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
    console.log(result)

    if (!destination) {
      return;
    }
    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    const newRbs = [...rbs];
    if (destination.droppableId === 'rbs') {
      newRbs.splice(source.index, 1);
      newRbs.splice(destination.index, 0, rbs[source.index]);

      newRbs.map((rb, index) => rb.rank = (index + 1));
    }

    if (destination.droppableId === 'remove') {
      newRbs[source.index].rank = null;
    }

    axios.put('http://localhost:3001/rbs', newRbs)
        .then(() => {
          console.log('successfully updated rbs');
          newRbs.splice(source.index, 1);
          console.log('newRbs', newRbs)

          setRbs(newRbs);
        })
        .catch(() => console.log('failed to update rbs'));
  }

  return (
    <div className="App">
      <div style={{display: 'flex'}}></div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Column players={rbs} title='RBs' droppableId={'rbs'}/>
          <h4 style={{ marginBottom: '5px' }}>
            Remove Player
          </h4>
        <Container>
          <Droppable droppableId={'remove'}>
            {provided => (
              <Delete
                {...provided.droppableProps}
                ref={provided.innerRef}
              >

                {provided.placeholder}
              </Delete>
            )}
          </Droppable>
        </Container>
      </DragDropContext>
    </div>
  )
}

export default App;