import React, { useState, useEffect } from 'react';
import api from '../../axios/config';
import dataTestsIds from '../../utils/dataTestsIds';

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
                data-testid={ `${dataTestsIds[70]}${index}` }
              >
                {id}

              </td>
              <td
                data-testid={ `${dataTestsIds[71]}${index}` }
              >
                {name}

              </td>
              <td
                data-testid={ `${dataTestsIds[72]}${index}` }
              >
                {email}

              </td>
              <td
                data-testid={ `${dataTestsIds[73]}${index}` }
              >
                {role}

              </td>
              <td>
                <button
                  data-testid={ `${dataTestsIds[74]}${index}` }
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
