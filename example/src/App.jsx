import React from 'react';
import Examples from './components/Examples';
import Usage1 from './data/Usage1';

const App = () => {
  return (
    <div className="app-container">
      <p className="title is-1">React Use Fetcher</p>
      <h1 className="title">Usage</h1>
      <h2 className="subtitle">Installation</h2>
      <p>Using yarn:</p>
      <pre>
        <code className="language-bash">yarn add reac-use-fetcher</code>
      </pre>
      <p>Using npm:</p>
      <pre>
        <code className="language-bash">npm install reac-use-fetcher</code>
      </pre>
      <h1 className="title">Examples</h1>
      <Examples />
    </div>
  );
};

export default App;
