import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './index.css';

const Preview = ({ Editor, Component, children}) => {
  const [tab, setTab] = useState(0);

  return (
    <>
      <div className="tabs">
        <ul>
          <li className={tab === 0 ? "is-active" : ""}><a onClick={() => setTab(0)}>Result</a></li>
          <li className={tab === 1 ? "is-active" : ""}><a onClick={() => setTab(1)}>Code</a></li>
        </ul>
      </div>
      <div className="tab-content">
        {React.Children.toArray(children)[tab]}
      </div>
    </>
  );
}

export default Preview;