import React, { useEffect } from 'react';
import { setToken } from '../axios/config';
import UserList from '../components/Administrator/UserList';
import UserManagementForm from '../components/Administrator/UserManagementForm';

export default function AdministratorProducts() {
  useEffect(() => {
    const { token } = JSON.parse(localStorage.getItem('user'));
    setToken(token);
  }, []);

  return (
    <div>
      <UserManagementForm />
      <UserList />
    </div>
  );
}
