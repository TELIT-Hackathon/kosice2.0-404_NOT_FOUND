import {
  handleLogout,
  signInWithGoogle,
  useAuth,
} from '../Firebase';

const Login = () => {
  const user = useAuth();

  return (
    <div>
      <p>curretn user email: {user?.email}</p>

      {!!user ? (
        <button onClick={() => handleLogout()}>logout</button>
      ) : (
        <button onClick={signInWithGoogle}>login</button>
      )}
    </div>
  );
};

export default Login;
