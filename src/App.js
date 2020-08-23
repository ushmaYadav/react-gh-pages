import React from 'react';
import './commonStyles/common.scss';
import './App.css';
import Transfer from './containers/Transfer';

const mockData = [
];

for (let i = 0; i < 5; i++) {
  mockData.push({
    id: i,
    name: `Content${i + 1}`,
  });
}

function App() {
  return (
    <div className="App">
      <Transfer data={mockData}/>
    </div>
  );
}

export default App;
