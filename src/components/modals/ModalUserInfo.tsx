import { useAppSelector } from "../../hooks/store";
import { Users } from "../../types.d";
import { IoIosClose } from "react-icons/io";

interface ModalUserInfoProps {
  email: string;
  openModalUserInfo: boolean;
  setOpenModalUserInfo: (openModalUserInfo: boolean) => void;
}

const ModalUserInfo = ({
  email,
  openModalUserInfo,
  setOpenModalUserInfo,
}: ModalUserInfoProps) => {
  const users: Users[] = useAppSelector((state) => state.users);

  const currentUser = users?.find((user) => user?.email === email);

  if (!openModalUserInfo) {
    return null;
  }

  return (
    <div
      onClick={() => setOpenModalUserInfo(false)}
      className="bg-neutral-800/70 absolute top-0 bottom-0 left-0 right-0 w-full flex justify-center items-center"
    >
      <section className="w-max mx-auto bg-gray-900 rounded-2xl px-5 py-6 shadow-lg">
        <div className="flex items-center justify-between">
          <span className="text-white text-base">
            {currentUser?.location.country}
          </span>
          <button onClick={() => setOpenModalUserInfo(false)}>
            <IoIosClose className="text-3xl text-white" />
          </button>
        </div>
        <div className="mt-6 w-fit mx-auto">
          <img src={currentUser?.picture.large} className="rounded-full" />
        </div>

        <div className="mt-8 ">
          <h2 className="text-white font-bold text-2xl tracking-wide">
            {currentUser?.name.first} <br /> {currentUser?.name.last}
          </h2>
        </div>
        <p className="text-emerald-400 font-semibold mt-2.5">
          Age: {currentUser?.dob.age}
        </p>
        <p className="text-blue-400 font-semibold mt-2.5">
          Age: {currentUser?.email}
        </p>

        <div className="mt-3 text-white text-sm">
          <span className="text-gray-400 font-semibold">Phone: </span>
          <span>{currentUser?.cell}</span>
        </div>
        <p className="text-orange-400 font-semibold mt-2.5">
          City: {currentUser?.location.city}
        </p>
      </section>
    </div>
  );
};

export default ModalUserInfo;
