import React, { useState, useEffect } from 'react';
import { useRequest, Fetcher, useCRUDRequests } from 'react-fetcher-hooks';
import axios from 'axios';

const API_URL = 'https://jsonbox.io/box_eba5d6b9a83397a97e4b/users2';

interface User {
  _id?: string;
  firstName: string;
  lastName: string;
}

const CRUDExample2 = () => {
  const users = useCRUDRequests<User[]>(API_URL);

  function onDelete(id: string) {
    users.delete(id, _ => {
      users.setItems(users.items.filter(v => v._id !== id));
    });
  }

  function onCreate() {
    users.post(
      {
        firstName: '#' + Math.round(Math.random() * 1000),
        lastName: 'User '
      },
      user => {
        users.setItems([...users.items, user]);
      }
    );
  }

  return (
    <div className='test-container'>
      <Fetcher refs={users.refs}>
        <span className='my-title'>Users CRUD</span>
        <div className='my-content'>
          {users.items.map(user => (
            <div key={user._id} className='crud-item'>
              <span>{user.lastName + ' ' + user.firstName}</span>
              <a className='button is-small is-danger is-outlined' onClick={() => onDelete(user._id)}>
                <span className='icon'>
                  <i className='fas fa-times'></i>
                </span>
              </a>
            </div>
          ))}
        </div>
        <div className='my-footer'>
          <a className='button is-primary' onClick={onCreate}>
            Add
          </a>
          <a className='button is-primary' onClick={users.get}>
            Refresh
          </a>
        </div>
      </Fetcher>
    </div>
  );
};

export default CRUDExample2;
