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

const Column = ({players, droppableId, pick, draftPlayer}) => {
  return (
    <div style={{display: 'flex', flexDirection: 'column'}}>
      {droppableId === 'top200'
      ? (
        <Headers style={{display: 'grid', gridTemplateColumns: '[draft] 1fr [rank] 1fr [pos] 1fr [name] 3fr [team] 2fr [bye] 1fr [adp] 1fr [diff] 1fr [end]'}}>
          <div>Draft</div>
          <div>Rank</div>
          <div>Pos</div>
          <div>Name</div>
          <div>Team</div>
          <div>Bye</div>
          <div>ADP</div>
          <div>Diff</div>
        </Headers>
      ) : (
        <Headers style={{display: 'grid', gridTemplateColumns: '[rank] 1fr [photo] 2fr [name] 3fr [team] 2fr [age] 1fr [bye] 1fr [adp] 1fr [end]'}}>
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
                <>
                  {/* {droppableId === 'top200' && (
                    <button onClick={() => draftPlayer(index, player.name)}>X</button>
                  )} */}
                  <Player key={player.id} player={player} index={index} droppableId={droppableId} pick={pick} draftPlayer={draftPlayer} />
                </>
              )}
              {provided.placeholder}
            </PlayerList>
          )}
        </Droppable>
      </Container>
    </div>
  )
}

export default Column;
