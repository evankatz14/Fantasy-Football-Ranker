import React, {useEffect, useState} from 'react';
import './App.css';
import axios from 'axios';
import _ from 'underscore';
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
  const [position, setPosition] = useState('rbs')

  useEffect(() => {
    axios.get('http://localhost:3001/rbs')
      .then(res => {
        const rbsWithRanks = res.data.map((rb, index) => {
          return {...rb, position_rank: index + 1};
        })
        setRbs(rbsWithRanks);
      })
  }, []);

  const memoizeGetWrs = _.memoize(() => {
    axios.get('http://localhost:3001/wrs')
      .then(res => {
        const wrsWithRanks = res.data.map((wr, index) => {
          return {...wr, position_rank: index + 1};
        })
        setWrs(wrsWithRanks);
      })
      .catch(err => console.log(err));
  })

  const handleChangeTab = () => {
      memoizeGetWrs()
      setPosition('wrs');
    }

  const onDragEnd = result => {
    const {destination, source} = result;
    console.log(result)

    if (!destination) {
      return;
    }
    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    // const newRbs = [...rbs];
    const newPlayers = source.droppableId === 'rbs' ? [...rbs] : source.droppableId === 'wrs' ? [...wrs] : [];
    // if (destination.droppableId === 'RBs') {
      // newRbs.splice(source.index, 1);
      // newRbs.splice(destination.index, 0, rbs[source.index]);
      let temp = newPlayers[source.index];
      newPlayers.splice(source.index, 1);
      newPlayers.splice(destination.index, 0, temp);

      // newRbs.map((rb, index) => rb.position_rank = (index + 1));
      newPlayers.map((player, index) => player.position_rank = (index + 1));
      // setRbs(newRbs);
      source.droppableId === 'rbs' ? setRbs(newPlayers) : setWrs(newPlayers);
    // }

    // if (destination.droppableId === 'remove') {
    //   newRbs[source.index].position_rank = null;

    //   const displayRbs = [...newRbs];
    //   displayRbs.splice(source.index, 1);
    //   setRbs(displayRbs);
    // }

    axios.put(`http://localhost:3001/${position}`, newPlayers)
        .then(() => {
          console.log('successfully updated players');
        })
        .catch(() => console.log('failed to update players'));
  }

  return (
    <div className="App">
      <div style={{display: 'flex', marginLeft: '8px', width: '40vw'}}>
        <Title className={position === 'rbs' && "selected"} onClick={() => setPosition('rbs')}>RBs</Title>
        <Title className={position === 'wrs' && "selected"} onClick={handleChangeTab}>WRs</Title>
        <Title className={position === 'qbs' && "selected"} onClick={() => setPosition('qbs')}>QBs</Title>
        <Title className={position === 'tes' && "selected"} onClick={() => setPosition('tes')}>TEs</Title>
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Column players={position === 'rbs' ? rbs : position === 'wrs' ? wrs : position === 'qbs' ? qbs : tes} droppableId={position}/>
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