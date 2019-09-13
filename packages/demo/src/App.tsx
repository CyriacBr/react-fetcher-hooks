import React from 'react';
import PlaceholderExample from './components/PlaceholderExample';
import 'use-fetcher-react/dist/styles.css';
import MultipleExample2 from './components/MultipleExample2';

const App: React.FC = () => {
  return (
    <div className="app-container">
      <p className="title is-1">React Use Fetcher</p>
      <h3>Placeholder Example</h3>
      <PlaceholderExample />
      <h3>Multiple Example2</h3>
      <MultipleExample2 />
    </div>
  );
};

export default App;
