import React from 'react';
import MinimalExample from './components/MinimalExample';
import ForcedLoadingExample from './components/ForcedLoadingExample';
import ForcedErrorExample from './components/ForcedErrorExample';
import FailExample from './components/FailExample';
import FailButtonExample from './components/FailButtonExample';
import BasicExample from './components/BasicExample';
import LocationExample from './components/LocationExample';
import ProgressExample from './components/ProgressExample';
import ProgressFailureExample from './components/ProgressFailureExample';
import DashboardExample from './components/DashboardExample';
import HandleExample from './components/HandleExample';
import MultipleExample1 from './components/MultipleExample1';
import CustomLoaderExample from './components/CustomLoaderExample';
import TodoExample from './components/TodoExample';
import ListenerExample from './components/ListenerExample';

const App: React.FC = () => {
  return (
    <div className="app-container">
      <p className="title is-1">React Use Fetcher</p>
      {/* <h3>Minimal</h3>
      <BasicExample />
      <h3>Custom LocationExample</h3>
      <LocationExample />
      <h3>Forced Loading</h3>
      <ForcedLoadingExample />
      <h3>Forced Error</h3>
      <ForcedErrorExample />
      <h3>Failure</h3>
      <FailExample />
      <h3>Custom Retry Button</h3>
      <FailButtonExample />
      <h3>Progess Bar</h3>
      <ProgressExample />
      <h3>Progress Bar With Failure</h3>
      <ProgressFailureExample />
      <h3>Handle Example</h3>
      <HandleExample /> */}
      <h3>Multiple Fetching</h3>
      <MultipleExample1 />
      <h3>Custom Loader</h3>
      <CustomLoaderExample />
      <h3>CRUD Example</h3>
      <TodoExample />
      <h3>Listener Example</h3>
      <ListenerExample />
    </div>
  );
};

export default App;
