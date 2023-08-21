import { useEffect, useRef, useState } from "react";
import { SortBy, type Users } from "./types.d";
import { UsersList } from "./components/UsersList";
import FiltersOptions from "./components/FiltersOptions";
import { fetchUsers } from "./store/users/usersAction";
import { useAppDispatch, useAppSelector } from "./hooks/store";
import { deleteUser, setUsers, restoreDeletedUsers } from "./store/users/slice";
import Header from "./components/home/presentation/Header";
import LoadingScreen from "./components/ui/LoadingScreen";
import ModalDeleteUser from "./components/modals/ModalDeleteUser";
import { useFilteredUsers } from "./utils/useFilteredUsers";
import { useSortedUsers } from "./utils/useSortedUsers";
import { FaUser } from "react-icons/fa";
import ModalUserInfo from "./components/modals/ModalUserInfo";

function App() {
  const [showColors, setShowColors] = useState(false);
  const [sorting, setSorting] = useState<SortBy>(SortBy.NONE);
  const [filterCountry, setFilterCountry] = useState<string | null>(null);
  const [optionsOpen, setOptionsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [emailSelected, setEmailSelected] = useState("");
  const [openModalUserInfo, setOpenModalUserInfo] = useState(false);

  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const dispatch = useAppDispatch();
  const users: Users[] = useAppSelector((state) => state.users);
  const filteredUsers = useFilteredUsers(users, filterCountry);
  const sortedUsers = useSortedUsers(filteredUsers, sorting);

  useEffect(() => {
    const persistedState = localStorage.getItem("reduxState");
    if (persistedState) {
      const parsedState = JSON.parse(persistedState);
      dispatch(setUsers(parsedState.users));
    } else {
      setIsLoading(true);
      dispatch(fetchUsers("https://randomuser.me/api?results=100"))
        .then(() => {
          setIsLoading(false);
        })
        .catch(() => {
          setIsLoading(false);
        });
    }
  }, [dispatch]);

  useEffect(() => {
    const closeDropdown = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOptionsOpen(false);
      }
    };

    document.addEventListener("click", closeDropdown);

    return () => {
      document.removeEventListener("click", closeDropdown);
    };
  }, []);

  const toggleColors = () => {
    setShowColors(!showColors);
  };

  const toggleSortByCountry = () => {
    const newSortingValue =
      sorting === SortBy.NONE ? SortBy.COUNTRY : SortBy.NONE;
    setSorting(newSortingValue);
  };

  const handleOpenDeleteModal = (email: string) => {
    setDeleteModalOpen(true);
    setEmailSelected(email);
  };

  const handleDelete = (email: string) => {
    dispatch(deleteUser(email));
  };

  const handleOpenUserModal = (email: string) => {
    setOpenModalUserInfo(true);
    setEmailSelected(email);
  };

  const handleReset = () => {
    dispatch(restoreDeletedUsers());

    localStorage.removeItem("deletedUsers");
  };

  const existDeletedUsers = !!localStorage.getItem("deletedUsers");

  const handleChangeSort = (sort: SortBy) => {
    setSorting(sort);
  };

  return (
    <>
      <div className="relative">
        <div className="w-full pb-20">
          <div className="flex justify-center items-center gap-x-5">
            <h1 className="text-gray-900 uppercase text-center py-10 font-bold text-2xl lg:text-4xl">
              Worker List App
            </h1>
            <p className="flex items-center gap-x-1 text-subtext">
              <FaUser className="text-2xl" />
              <span className="font-bold">{users?.length}</span>
            </p>
          </div>
          <Header
            dropdownRef={dropdownRef}
            optionsOpen={optionsOpen}
            setFilterCountry={setFilterCountry}
            setOptionsOpen={setOptionsOpen}
            children={
              <FiltersOptions
                handleReset={handleReset}
                toggleColors={toggleColors}
                sorting={sorting}
                toggleSortByCountry={toggleSortByCountry}
                showColors={showColors}
                deletedUsers={existDeletedUsers}
              />
            }
          />
          <main>
            <div className="w-full px-4 lg:px-52 md:px-20 2xl:px-80">
              <div className="w-full text-center pb-5">
                <p className="text-xs font-bold text-subtext">
                  Click:{" "}
                  <span className="font-normal">
                    {"Name - Surname or Country to order"}
                  </span>
                </p>
              </div>
              <UsersList
                changeSorting={handleChangeSort}
                users={sortedUsers}
                showColor={showColors}
                handleOpenDeleteModal={handleOpenDeleteModal}
                inputValue={filterCountry}
                handleModalUserInfo={handleOpenUserModal}
              />
            </div>
          </main>
        </div>
      </div>
      {isLoading && <LoadingScreen />}
      <ModalDeleteUser
        deleteModalOpen={deleteModalOpen}
        setDeleteModalOpen={setDeleteModalOpen}
        emailToDelete={emailSelected}
        handleDelete={handleDelete}
      />
      <ModalUserInfo
        email={emailSelected}
        openModalUserInfo={openModalUserInfo}
        setOpenModalUserInfo={setOpenModalUserInfo}
      />
    </>
  );
}

export default App;
