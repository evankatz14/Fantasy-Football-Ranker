import React from 'react';
import './App.css';

import VerticalDragList from './components/vertical-dnd.component';
import MultipleDragList from './components/multiple-list-dnd.component';

function App() {
  return (
    <div className="App">
      <h3>Single list</h3>
      <VerticalDragList />

      <h3>Multiple Lists</h3>
      <MultipleDragList />
    </div>
  )
}

export default App;