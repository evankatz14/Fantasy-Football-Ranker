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
  position: fixed;
  top: 87%;
  width: 95%;
`;
const Delete = styled.div`
`;
const Title = styled.div`
  width: 10vw;
  padding: 8px 0;
  border: 1px solid lightgrey;
  border-radius: 2px;
`;

function App() {
  const [rbs, setRbs] = useState([]);
  const [wrs, setWrs] = useState([]);
  const [qbs, setQbs] = useState([]);
  const [tes, setTes] = useState([]);
  const [position, setPosition] = useState('RBs')

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
    if (destination.droppableId === 'RBs') {
      newRbs.splice(source.index, 1);
      newRbs.splice(destination.index, 0, rbs[source.index]);

      newRbs.map((rb, index) => rb.rank = (index + 1));
      setRbs(newRbs);
    }

    if (destination.droppableId === 'remove') {
      newRbs[source.index].rank = null;

      const displayRbs = [...newRbs];
      displayRbs.splice(source.index, 1);
      setRbs(displayRbs);
    }

    axios.put('http://localhost:3001/rbs', newRbs)
        .then(() => {
          console.log('successfully updated rbs');
        })
        .catch(() => console.log('failed to update rbs'));
  }

  return (
    <div className="App">
      <div style={{display: 'flex', marginLeft: '8px', width: '40vw'}}>
        <Title className={position === 'RBs' && "selected"} onClick={() => setPosition('RBs')}>RBs</Title>
        <Title className={position === 'WRs' && "selected"} onClick={() => setPosition('WRs')}>WRs</Title>
        <Title className={position === 'QBs' && "selected"} onClick={() => setPosition('QBs')}>QBs</Title>
        <Title className={position === 'TEs' && "selected"} onClick={() => setPosition('TEs')}>TEs</Title>
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Column players={position === 'RBs' ? rbs : position === 'WRs' ? wrs : position === 'QBs' ? qbs : tes} title='RBs' droppableId={position}/>
        <Container>
          <Droppable droppableId={'remove'}>
            {provided => (
              <Delete
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                Remove Player
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