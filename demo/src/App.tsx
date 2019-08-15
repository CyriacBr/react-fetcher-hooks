import React from 'react';
import MinimalExample from './components/MinimalExample';
import ForcedLoading from './components/ForcedLoading';
import ForcedError from './components/ForcedError';
import FailExample from './components/FailExample';
import FailButton from './components/FailButton';
import BasicExample from './components/BasicExample';
import Location from './components/Location';
import ProgressExample from './components/ProgressExample';
import ProgressFailure from './components/ProgressFailure';
import DashboardExample from './components/DashboardExample';
import HandleExample from './components/HandleExample';
import MultipleExample1 from './components/MultipleExample1';
import CustomLoader from './components/CustomLoader';
import TodoExample from './components/TodoExample';
import ListenerExample from './components/ListenerExample';

const App: React.FC = () => {
  return (
    <div className="app-container">
      <p className="title is-1">React Use Fetcher</p>
      {/* <h3>Minimal</h3>
      <BasicExample />
      <h3>Custom Location</h3>
      <Location />
      <h3>Forced Loading</h3>
      <ForcedLoading />
      <h3>Forced Error</h3>
      <ForcedError />
      <h3>Failure</h3>
      <FailExample />
      <h3>Custom Retry Button</h3>
      <FailButton />
      <h3>Progess Bar</h3>
      <ProgressExample />
      <h3>Progress Bar With Failure</h3>
      <ProgressFailure />
      <h3>Handle Example</h3>
      <HandleExample /> */}
      <h3>Multiple Fetching</h3>
      <MultipleExample1 />
      <h3>Custom Loader</h3>
      <CustomLoader />
      <h3>CRUD Example</h3>
      <TodoExample />
      <h3>Listener Example</h3>
      <ListenerExample />
    </div>
  );
};

export default App;
