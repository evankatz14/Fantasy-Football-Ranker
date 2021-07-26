import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import Player from './Player'

const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
`;
const Title = styled.h3`
  padding: 8px;
`;
const PlayerList = styled.div`
  padding: 8px;
`;

const Column = ({players, title}) => {
  return (
    <Container>
      <Title>{title}</Title>
      <Droppable droppableId={'rbs'}>
        {provided => (
          <PlayerList
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {players.map((player, index) => <Player key={player.id} player={player} index={index} />)}
          </PlayerList>
        )}
      </Droppable>
    </Container>
  )
}

export default Column;
