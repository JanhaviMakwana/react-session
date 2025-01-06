import React, { useCallback, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../store/index";
import { useGetUsersQuery } from "../store/reducers/userApi";
import { addUser, UserItem, deleteUser, editUser } from "../store/reducers/users";

interface UserList {
  title: string;
  users: UserItem[];
  canUpdate: boolean;
  onDeleteUser?: (id: string) => void;
  isLoading: boolean;
}

interface UserInputProps {
  name: string;
  onAddUser?: (name: string) => void;
  onEditUser?: (name: string, id: string) => void;
  id?: string;
  type: string;
}

const UserManagementApp = () => {
  const { data: users, isLoading } = useGetUsersQuery();
  const { users: localUsers, loading } = useSelector(
    (state: RootState) => state.users
  );
  const dispatch: AppDispatch = useDispatch();

  const handleAddUser = useCallback((name: string) => {
    dispatch(addUser({ name, id: Date.now().toString() }));
  }, []);

  const handleDeleteUser = useCallback((id: string) => {
    dispatch(deleteUser(id));
  }, []);

  return (
    <div style={{ margin: "20px" }}>
      <h1>User Management</h1>
      <UserInput type="Add" onAddUser={handleAddUser} name="" />
      <UsersList
        title="Users"
        users={users || []}
        canUpdate={false}
        isLoading={isLoading}
      />
      <UsersList
        title="Local users"
        users={localUsers}
        onDeleteUser={handleDeleteUser}
        canUpdate={true}
        isLoading={loading}
      />
    </div>
  );
};

const UserInput = ({ onAddUser, onEditUser, name, type, id }: UserInputProps) => {
  const [userName, setUserName] = React.useState(name);

  const handleAdd = () => {
    onAddUser?.(userName);
    setUserName?.("");
  };

  const handleUpdate = () => {
    onEditUser?.(userName, id || "");
  }

  return (
    <div style={{ marginBottom: "20px" }}>
      <input
        type="text"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        placeholder="Enter user's name"
        style={{ marginRight: "10px", padding: "5px" }}
      />
      <button onClick={() => {
        if(type === "Update"){
          handleUpdate();
        }else{
          handleAdd();
        }
      }}>{type} User</button>
    </div>
  );
};

const UsersList = ({
  title,
  users,
  onDeleteUser,
  canUpdate,
  isLoading,
}: UserList) => {
  const [editUserItem, setEditUserItem] = useState<UserItem | null>(null);
  const dispatch: AppDispatch = useDispatch();

  const handleEditUser = useCallback((name: string, id?: string) => {
    dispatch(editUser({ name, id: id || Date.now().toString() }));
    setEditUserItem(null);
  }, []);

  return (
    <div>
      <h2>{title}</h2>
      <ul>
        {!isLoading &&
          users.map((user: UserItem) => (
            <li key={user.id} style={{ marginBottom: "10px" }}>
              {editUserItem !== null ? (
                <>
                  <UserInput
                    type="Update"
                    name={user.name}
                    id={user.id}
                    onEditUser={handleEditUser}
                  />
                  <button
                    onClick={() => setEditUserItem(null)}
                    style={{ marginLeft: "10px" }}
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <span
                  style={{
                    marginRight: "10px"
                  }}
                >
                  {user.name}
                </span>
              )}
              {editUserItem === null && canUpdate && (
                <button
                  onClick={() => onDeleteUser?.(user.id)}
                  style={{ marginLeft: "10px" }}
                >
                  Delete
                </button>
              )}
              {editUserItem === null && canUpdate && (
                <button
                  onClick={() => setEditUserItem({ id: user.id, name: user.name })}
                  style={{ marginLeft: "10px" }}
                >
                  Edit
                </button>
              )}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default UserManagementApp;
