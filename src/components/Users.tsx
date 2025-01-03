import React, { useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from "../store/index";
import { useGetUsersQuery } from '../store/reducers/userApi';
import { addUser, UserItem, deleteUser } from '../store/reducers/users';

interface UserList {
    title: string;
    users: UserItem[];
    canDelete: boolean;
    onDeleteUser?: (id: string) => void;
    isLoading: boolean;
}

const UserManagementApp = () => {
  const { data: users, isLoading } = useGetUsersQuery();
  const { users: localUsers, loading } = useSelector((state: RootState) => state.users);
  const dispatch: AppDispatch = useDispatch();

  const handleAddUser = useCallback((name: string) => {
    dispatch(addUser({name, id: Date.now().toString()}));
  }, []);

  const handleDeleteUser = useCallback((id: string) => {
    dispatch(deleteUser(id));
  }, []);

  return (
    <div style={{ margin: '20px' }}>
      <h1>User Management</h1>
      <UserInput onAddUser={handleAddUser} />
      <UsersList
        title="Users"
        users={users || []}
        canDelete={false}
        isLoading={isLoading}
      />
      <UsersList
        title="Local users"
        users={localUsers}
        onDeleteUser={handleDeleteUser}
        canDelete={true}
        isLoading={loading}
      />
    </div>
  );
};

const UserInput = ({ onAddUser }) => {
  const [userName, setUserName] = React.useState('');

  const handleAdd = () => {
    onAddUser(userName);
    setUserName('');
  };

  return (
    <div style={{ marginBottom: '20px' }}>
      <input
        type="text"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        placeholder="Enter user's name"
        style={{ marginRight: '10px', padding: '5px' }}
      />
      <button onClick={handleAdd}>Add User</button>
    </div>
  );
};

const UsersList = ({ title, users, onDeleteUser, canDelete, isLoading }: UserList) => {
  const [] = useState<boolean>(false);
  return (
    <div>
      <h2>{title}</h2>
      <ul>
        {!isLoading && users.map((user: UserItem) => (
          <li key={user.id} style={{ marginBottom: '10px' }}>
            <span
              style={{
                marginRight: '10px',
              }}
            >
              {user.name}
            </span>
            {canDelete && <button
              onClick={() => onDeleteUser?.(user.id)}
              style={{ marginLeft: '10px' }}
            >
              Delete
            </button>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserManagementApp;
