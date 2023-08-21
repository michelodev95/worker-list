const LoadingScreen = () => {
  return (
    <div className="absolute top-0 bottom-0 left-0 right-0 z-50 bg-black/80 flex justify-center items-center text-white">
      <p className="font-bold text-2xl">Loading Users...</p>
    </div>
  );
};

export default LoadingScreen;
