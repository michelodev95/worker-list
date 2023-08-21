// userUtils.tsx
import { useMemo } from "react";
import { Users } from "../types.d";

export function useFilteredUsers(
  users: Users[],
  filterCountry: string | null
): Users[] {
  return useMemo(() => {
    return typeof filterCountry === "string" && filterCountry.length > 0
      ? users.filter((user) => {
          return user.location.country
            .toLowerCase()
            .includes(filterCountry.toLowerCase());
        })
      : users;
  }, [users, filterCountry]);
}
