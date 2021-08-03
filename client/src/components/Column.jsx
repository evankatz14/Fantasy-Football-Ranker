import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import Player from './Player'

const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
  width: 40vw;
  overflow-y: scroll;
  height: 90vh;
`;
const Title = styled.h3`
  width: 40vw;
  padding: 8px;
`;
const PlayerList = styled.div`
`;

const Headers = styled.h4`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
  width: 40vw;
`;

const Column = ({players, title, droppableId}) => {
  return (
    <>
    <Title>{title}</Title>
    <Headers style={{marginBottom: '8px', display: 'grid', gridTemplateColumns: '[rank] 1fr [name] 2fr [team] 1fr [age] 1fr [bye] 1fr [adp] 1fr [end]'}}>
      <div>Rank</div>
      <div>Name</div>
      <div>Team</div>
      <div>Age</div>
      <div>Bye</div>
      <div>ADP</div>
    </Headers>
    <Container>
      <Droppable droppableId={droppableId}>
        {provided => (
          <PlayerList
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {players.map((player, index) => <Player key={player.id} player={player} index={index} />)}
            {provided.placeholder}
          </PlayerList>
        )}
      </Droppable>
    </Container>
    </>
  )
}

export default Column;
