import React from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';

const Container = styled.div`
  border: 1px solid lightgrey;
  border-radius: 2px;
  margin: 8px;
  padding: 8px;
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
        {player.name}
      </Container>
     )}
   </Draggable>
 )
}

export default Player;