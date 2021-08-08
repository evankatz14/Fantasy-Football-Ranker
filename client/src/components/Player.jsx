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
const Row = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Player = ({player, index, droppableId}) => {
 return (
  <div>
    <Draggable draggableId={player.name} index={index}>
      {provided => (
      <Container
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        ref={provided.innerRef}
      >
        {droppableId === 'top200'
          ? (
            <div style={{display: 'grid', gridTemplateColumns: '[rank] 1fr [pos] 1fr [name] 3fr [team] 2fr [age] 1fr [bye] 1fr [adp] 1fr [end]'}}>
              <Row>{index + 1}</Row>
              <Row>{player.position}</Row>
              <Row>{player.name}</Row>
              <Row>{player.team}</Row>
              <Row>{player.age}</Row>
              <Row>{player.bye_week}</Row>
              <Row>{player.adp}</Row>
            </div>
          ) : (
            <div style={{display: 'grid', gridTemplateColumns: '[rank] 1fr [photo] 2fr [name] 3fr [team] 2fr [age] 1fr [bye] 1fr [adp] 1fr [end]'}}>
              <Row>{index + 1}</Row>
              <img style={{width: '50px', height: 'auto', marginLeft: 'auto', marginRight: 'auto'}} src={player.photo_url} alt="headshot" />
              <Row>{player.name}</Row>
              <Row>{player.team}</Row>
              <Row>{player.age}</Row>
              <Row>{player.bye_week}</Row>
              <Row>{player.adp}</Row>
            </div>
          )
        }
      </Container>
      )}
    </Draggable>
  </div>
 )
}

export default Player;