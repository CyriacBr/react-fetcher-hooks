import React, { useState, useEffect } from 'react';
import { useRequest, Fetcher } from 'react-fetcher-hooks';
import axios from 'axios';

const API_URL = 'https://jsonbox.io/box_eba5d6b9a83397a97e4b/users';

interface User {
  _id?: string;
  firstName: string;
  lastName: string;
}

const CRUDExample = () => {
  const [getRef, getUsers, users, setUsers] = useRequest(() => axios.get<User[]>(API_URL), true);
  const [postRef, postUser] = useRequest((user: User) => axios.post<User>(API_URL, user));
  const [deleteRef, deleteUser] = useRequest((id: string) => axios.delete(API_URL + '/' + id));

  function onDelete(id: string) {
    deleteUser(id, _ => {
      setUsers(users.filter(v => v._id !== id));
    });
  }

  function onCreate() {
    postUser(
      {
        firstName: '#' + Math.round(Math.random() * 1000),
        lastName: 'User '
      },
      user => {
        setUsers([...users, user]);
      }
    );
  }

  return (
    <div className='test-container'>
      <Fetcher refs={[getRef, postRef, deleteRef]}>
        <span className='my-title'>Users CRUD</span>
        <div className='my-content'>
          {users.map(user => (
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
          <a className='button is-primary' onClick={getUsers}>
            Refresh
          </a>
        </div>
      </Fetcher>
    </div>
  );
};

export default CRUDExample;
