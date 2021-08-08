import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import Player from './Player'

const Container = styled.div`
  margin: 0 8px 0 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
  width: 40vw;
  overflow-y: scroll;
  height: 85vh;
`;
const PlayerList = styled.div`
`;
const Headers = styled.h4`
  margin: 0 8px 0 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
  width: 40vw;
`;

const Column = ({players, droppableId}) => {
  return (
    <div style={{display: 'flex', flexDirection: 'column'}}>
      {droppableId === 'top200'
      ? (
        <Headers style={{display: 'grid', gridTemplateColumns: '[rank] 1fr [name] 2fr [team] 1fr [age] 1fr [bye] 1fr [adp] 1fr [end]'}}>
          <div>Rank</div>
          <div>Name</div>
          <div>Team</div>
          <div>Age</div>
          <div>Bye</div>
          <div>ADP</div>
        </Headers>
      ) : (
        <Headers style={{display: 'grid', gridTemplateColumns: '[rank] 1fr [photo] 1fr [name] 2fr [team] 1fr [age] 1fr [bye] 1fr [adp] 1fr [end]'}}>
          <div>Rank</div>
          <div>Photo</div>
          <div>Name</div>
          <div>Team</div>
          <div>Age</div>
          <div>Bye</div>
          <div>ADP</div>
        </Headers>
      )}
      <Container>
        <Droppable droppableId={droppableId}>
          {provided => (
            <PlayerList
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {players.map((player, index) =>
                <Player key={player.id} player={player} index={index} droppableId={droppableId}/>)}
              {provided.placeholder}
            </PlayerList>
          )}
        </Droppable>
      </Container>
    </div>
  )
}

export default Column;
