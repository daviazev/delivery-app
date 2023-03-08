import React, { useState, useEffect } from 'react';
import api from '../../axios/config';

export default function UserList() {
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    const usersResponse = await api.get('/admin/manage');
    const removeAdminsUser = usersResponse.data
      .filter(({ role }) => role !== 'administrator');
    setUsers(removeAdminsUser);
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Nome</th>
            <th>Email</th>
            <th>Função</th>
            <th>Excluir</th>
          </tr>
        </thead>
        <tbody>
          {users.map(({ id, name, email, role }, index) => (
            <tr key={ id }>
              <td
                data-testid={ `admin_manage__element-user-table-item-number-${index}` }
              >
                {id}

              </td>
              <td
                data-testid={ `admin_manage__element-user-table-name-${index}` }
              >
                {name}

              </td>
              <td
                data-testid={ `admin_manage__element-user-table-email-${index}` }
              >
                {email}

              </td>
              <td
                data-testid={ `admin_manage__element-user-table-role-${index}` }
              >
                {role}

              </td>
              <td>
                <button
                  data-testid={ `admin_manage__element-user-table-remove-${index}` }
                  type="button"
                >
                  Excluir

                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
