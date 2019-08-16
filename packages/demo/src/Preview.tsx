import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './index.css';

export interface PreviewProps {
  tabNames?: string[];
}

const Preview: React.FC<PreviewProps> = ({ children, tabNames }) => {
  const [tab, setTab] = useState(0);
  const childrenArray = React.Children.toArray(children);

  return (
    <div className="preview-container">
      <div className="tabs">
        <ul>
        {
          childrenArray.map((node, i) => 
            (
              <li key={i} className={tab === i ? "is-active" : ""}>
                <a onClick={() => setTab(i)}>
                  {(tabNames || ['Result','Code'])[i]}
                </a>
              </li>
            )
          )
        }
        </ul>
      </div>
      <div className="tab-content">
        {childrenArray[tab]}
      </div>
    </div>
  );
}

export default Preview;