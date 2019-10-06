import React from 'react';
import BasicExample from './components/v1/BasicExample';
import ManualUsageExample from './components/v1/ManualUsageExample';
import CRUDExample from './components/v1/CRUDExample';
import CRUDExample2 from './components/v1/CRUDExample2';
import CustomLoaderExample from './components/v1/CustomLoaderExample';
import FailExample from './components/v1/FailExample';
import FailButtonExample from './components/v1/FailButtonExample';
import ProgressExample from './components/v1/ProgressExample';
import PlaceholderExample from './components/v1/PlaceholderExample';
import PlaceholderExample2 from './components/v1/PlaceholderExample2';

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
    </div>
  );
};

export default App;
