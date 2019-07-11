import React from 'react';
import MinimalLoadingExample from './components/MinimalLoadingExample';
import MinimalExample from './components/MinimalExample';
import MinimalErrorExample from './components/MinimalErrorExample';
import MinimalOptionsExample from './components/MinimalOptionsExample';
import MinimalProgressExample from './components/MinimalProgressExample';

const App = () => {
  return (
    <div className="app-container">
      <p className="title is-1">React Use Fetcher</p>
      <h3>Minimal</h3>
      <MinimalExample />
      <h3>Minimal Loading</h3>
      <MinimalLoadingExample />
      <h3>Minimal Error</h3>
      <MinimalErrorExample />
      <h3>Minimal Options</h3>
      <MinimalOptionsExample />
      <h3>Minimal Progress Example</h3>
      <MinimalProgressExample />
    </div>
  );
};

export default App;
