import { setUsers } from "./slice";

export const fetchUsers =
  (url: string) => async (dispatch: (arg0: any) => void) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      const users = data.results;
      dispatch(setUsers(users));
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
    }
  };
