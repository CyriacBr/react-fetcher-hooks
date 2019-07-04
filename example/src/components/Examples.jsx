import React, { Component, useState, useEffect } from 'react';
import { useFetcher, Fetcher } from 'react-use-fetcher';
import axios from 'axios';
import BasicExample from './BasicExample';
import BasicExampleCode from '../data/BasicExample';
import FailExampleCode from '../data/FailExample';
import FailExample from './FailExample';
import FailButtonExampleCode from '../data/FailButtonExample';
import FailButtonExample from './FailButtonExample';

const Examples = () => {
  const data = [
    {
      title: 'Basic Example',
      code: BasicExampleCode,
      component: <BasicExample />,
      lines: ['2', '6', '10-13']
    },
    {
      title: 'Failure Example',
      code: FailExampleCode,
      component: <FailExample />,
      lines: ['2']
    },
    {
      title: 'Failure Example With Custom Button',
      code: FailButtonExampleCode,
      component: <FailButtonExample />,
      lines: ['2']
    }
  ];
  return (
    <div className="examples-container">
      {data.map(item => (
        <div>
          <h2 className="subtitle">{item.title}</h2>
          <div className="example-item-container">
            <div className="code-container">
              <pre data-line={item.lines.join(',')}>
                <code className="language-jsx">{item.code}</code>
              </pre>
            </div>
            {item.component}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Examples;
