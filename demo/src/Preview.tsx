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
      <div>
        {childrenArray[0]}
      </div>
      <div className="tabs">
        <ul>
          {
            childrenArray.map((node, i) => {
              if (i === 0) return null;
              return (
                <li className={tab === i ? "is-active" : ""}><a onClick={() => setTab(i)}>
                  {(tabNames || ['Code'])[i - 1]}
                </a></li>
              )
            })
          }
        </ul>
      </div>
      <div className="tab-content">
        {React.Children.toArray(children)[tab + 1]}
      </div>
    </div>
  );
}

export default Preview;