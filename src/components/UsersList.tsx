import { SortBy, Users } from "../types.d";
import { LuMapPin } from "react-icons/lu";

interface Props {
  changeSorting: (sort: SortBy) => void;
  users: Users[];
  showColor: boolean;
  handleOpenDeleteModal: (email: string) => void;
  inputValue: string | null;
  handleModalUserInfo: (email: string) => void;
}

export function UsersList({
  users,
  showColor,
  handleOpenDeleteModal,
  changeSorting,
  inputValue,
  handleModalUserInfo,
}: Props) {
  return (
    <div className="relative overflow-x-auto h-[400px] lg:h-[500px] 2xl:h-[650px]">
      {users?.length > 0 ? (
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-gray-700 text-sm font-bold uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 cursor-pointer"
                onClick={() => changeSorting(SortBy.NAME)}
              >
                Name
              </th>
              <th
                scope="col"
                className="px-6 py-3 cursor-pointer"
                onClick={() => changeSorting(SortBy.LAST)}
              >
                Surname
              </th>
              <th
                scope="col"
                className="px-6 py-3 cursor-pointer"
                onClick={() => changeSorting(SortBy.COUNTRY)}
              >
                Country
              </th>
              <th scope="col" className="px-6 py-3 cursor-pointer">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {users?.map((user, index) => {
              const backgroundColor =
                index % 2 === 0
                  ? "bg-gray-300 text-black"
                  : "bg-gray-100 text-black";
              const color = showColor
                ? `${backgroundColor} hover:bg-gray-800 hover:text-white`
                : "bg-transparent hover:bg-gray-100";

              return (
                <tr
                  key={`${user.login.uuid}-${user.id}`}
                  className={`${color} `}
                >
                  <th
                    scope="row"
                    onClick={() => handleModalUserInfo(user.email)}
                    className="flex cursor-pointer items-center px-6 py-4 font-medium whitespace-nowrap"
                  >
                    <img
                      className="w-10 h-10 rounded-full"
                      src={user.picture.thumbnail}
                    />
                    <div className="pl-3">
                      <div className="text-base font-semibold">
                        {user.name.first}
                      </div>
                    </div>
                  </th>
                  <td className="px-6 py-4 text-base font-semibold">
                    {user.name.last}
                  </td>
                  <td className="px-6 py-4 text-base font-semibold">
                    <div className="flex items-center gap-x-2">
                      <LuMapPin />
                      <p>{user.location.country}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-base font-semibold">
                    <button
                      onClick={() => handleOpenDeleteModal(user.email)}
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline hover:text-red-400"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <div className="border flex rounded-md w-full absolute h-40 justify-center items-center text-xl gap-x-2">
          <div
            className="flex flex-col w-full lg:mx-40 h-40 mx-4 overflow-y-auto justify-center items-center"
            style={{ wordBreak: "break-word" }}
          >
            <p className="">We can't find :</p>
            <p className="font-semibold">{inputValue}</p>
          </div>
        </div>
      )}
    </div>
  );
}
