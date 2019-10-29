import React from 'react';
import BasicExample from './components/BasicExample';
import ManualUsageExample from './components/ManualUsageExample';
import CRUDExample from './components/CRUDExample';
import CRUDExample2 from './components/CRUDExample2';
import CustomLoaderExample from './components/CustomLoaderExample';
import FailExample from './components/FailExample';
import FailButtonExample from './components/FailButtonExample';
import ProgressExample from './components/ProgressExample';
import PlaceholderExample from './components/PlaceholderExample';
import PlaceholderExample2 from './components/PlaceholderExample2';
import PlaceholderFallbackExample from './components/PlaceholderFallbackExample';

const App: React.FC = () => {
  return (
    <div className="app-container">
      <p className="title is-1">React Use Fetcher</p>
      <h3>Basic Usage</h3>
      <BasicExample />
      <h3>Manual Usage</h3>
      <ManualUsageExample />
      <h3>CRUD</h3>
      <CRUDExample />
      <h3>CRUD 2</h3>
      <CRUDExample2 />
      <h3>Custom loader</h3>
      <CustomLoaderExample />
      <h3>Fail Example</h3>
      <FailExample />
      <h3>Fail Custom Button</h3>
      <FailButtonExample />
      <h3>Progress</h3>
      <ProgressExample />
      <h3>Placeholder</h3>
      <PlaceholderExample />
      <h3>Placeholder 2</h3>
      <PlaceholderExample2 />
      <h3>Placeholder Fallback</h3>
      <PlaceholderFallbackExample />
    </div>
  );
};

export default App;
