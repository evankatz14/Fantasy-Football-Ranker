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

const isUserPick = (pick, index) => {
  const inverse = 24 - (pick - 1);
  return (index + 1) % 24 === pick || (index + 1) % 24 === inverse % 24 ? 'blue' : 'white';
}

const Player = ({player, index, droppableId, pick, draftPlayer}) => {
  const color = isUserPick(pick, index);
  const {position, name, team, bye_week, yahoo_rank, diff, age, photo_url} = player;
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
              <div className={player.drafted ? 'drafted' : ''} style={{display: 'grid', gridTemplateColumns: '[draft] 1fr[rank] 1fr [pos] 1fr [name] 3fr [team] 2fr [bye] 1fr [adp] 1fr [diff] 1fr [end]'}}>
                <button onClick={() => draftPlayer(index, player.name, `${player.position.toLowerCase()}s`)}>X</button>
                <Row className={color} >{Math.ceil((index + 1) / 12)}.{((index) % 12) + 1}</Row>
                <Row>{position}</Row>
                <Row>{name}</Row>
                <Row>{team}</Row>
                <Row>{bye_week}</Row>
                <Row>{yahoo_rank}</Row>
                <Row>{diff}</Row>
              </div>
            ) : (
              <div className={player.drafted ? 'drafted' : ''} style={{display: 'grid', gridTemplateColumns: '[rank] 1fr [photo] 2fr [name] 3fr [team] 2fr [age] 1fr [bye] 1fr [adp] 1fr [end]'}}>
                <Row>{index + 1}</Row>
                <img style={{width: '50px', height: 'auto', marginLeft: 'auto', marginRight: 'auto'}} src={photo_url} alt="headshot" />
                <Row>{name}</Row>
                <Row>{team}</Row>
                <Row>{age}</Row>
                <Row>{bye_week}</Row>
                <Row>{yahoo_rank}</Row>
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