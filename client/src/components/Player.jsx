import React from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';

const Container = styled.div`
  border: 1px solid lightgrey;
  border-radius: 2px;
  margin: 8px 0 8px 0;
  padding: 8px 0 8px 0;
  background-color: white;
`;

const Player = ({player, index}) => {
 return (
   <Draggable draggableId={player.name} index={index}>
     {provided => (
      <Container
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        ref={provided.innerRef}
      >
        <div style={{display: 'grid', gridTemplateColumns: '[rank] 1fr [name] 2fr [team] 1fr [age] 1fr [bye] 1fr [adp] 1fr [end]'}}>
            <div>{index + 1}</div>
            <div>{player.name}</div>
            <div>{player.team}</div>
            <div>{player.age}</div>
            <div>{player.bye_week}</div>
            <div>{player.adp}</div>
        </div>
      </Container>
     )}
   </Draggable>
 )
}

export default Player;