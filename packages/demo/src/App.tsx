import React from 'react';
import PlaceholderExample from './components/PlaceholderExample';
import 'use-fetcher-react/dist/styles.css';

const App: React.FC = () => {
  return (
    <div className="app-container">
      <p className="title is-1">React Use Fetcher</p>
      <h3>Placeholder Example</h3>
      <PlaceholderExample />
    </div>
  );
};

export default App;
