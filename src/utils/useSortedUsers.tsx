// sortingUtils.tsx
import { useMemo } from "react";
import { SortBy, Users } from "../types.d";

export function useSortedUsers(
  filteredUsers: Users[],
  sorting: SortBy
): Users[] {
  return useMemo(() => {
    if (sorting === SortBy.NONE) return filteredUsers;

    const compareProperties: Record<string, (user: Users) => any> = {
      [SortBy.COUNTRY]: (user) => user.location.country,
      [SortBy.NAME]: (user) => user.name.first,
      [SortBy.LAST]: (user) => user.name.last,
    };

    return [...filteredUsers].sort((a, b) => {
      const extractProperty = compareProperties[sorting];
      return extractProperty(a).localeCompare(extractProperty(b));
    });
  }, [filteredUsers, sorting]);
}
