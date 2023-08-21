import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ID, Users } from "../../types.d";

export interface UserWithId extends Users {
  id: ID;
}

const initialState: UserWithId[] = (() => {
  const persistedState = localStorage.getItem("reduxState");
  if (persistedState) return JSON.parse(persistedState).users;
  return [];
})();

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUsers: (_state, action: PayloadAction<UserWithId[]>) => {
      return action.payload;
    },
    deleteUser: (state, action: PayloadAction<string>) => {
      const emailToDelete = action.payload;

      const deletedUsersData = localStorage.getItem("deletedUsers");
      const deletedUsers = deletedUsersData ? JSON.parse(deletedUsersData) : [];

      const deletedUser = state.find((user) => user.email === emailToDelete);

      if (deletedUser) {
        deletedUsers.push(deletedUser);

        localStorage.setItem("deletedUsers", JSON.stringify(deletedUsers));

        const updatedState = state.filter(
          (user) => user.email !== emailToDelete
        );

        return updatedState;
      } else {
        return state;
      }
    },
    restoreDeletedUsers: (state) => {
      const deletedUsersData = localStorage.getItem("deletedUsers");
      const deletedUsers = deletedUsersData ? JSON.parse(deletedUsersData) : [];

      return [...state, ...deletedUsers];
    },
  },
});

export const { setUsers, deleteUser, restoreDeletedUsers } = userSlice.actions;

export default userSlice.reducer;
