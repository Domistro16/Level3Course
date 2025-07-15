export default function LogInButton({
  setLoggedIn,
  loggedIn,
}: {
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>> | null;
  loggedIn: boolean;
}) {
  return (
    <button
      className="bg-blue-800 p-8 py-[8px] font-bold rounded-full hover:scale-105 duration-200 cursor-pointer"
      type="button"
      onClick={() => setLoggedIn && setLoggedIn(!loggedIn) /* connect() */} // connect() should be defined in the parent component
    >
      Login
    </button>
  );
}
