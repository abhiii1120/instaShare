const LoadingScreen = ({ label = "Loading" }) => {
  return (
    <div className="grid min-h-screen place-items-center bg-[#fafafa] px-4">
      <div className="flex flex-col items-center gap-4 text-center">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-zinc-200 border-t-zinc-900" />
        <p className="text-sm font-medium text-zinc-600">{label}</p>
      </div>
    </div>
  );
};

export default LoadingScreen;