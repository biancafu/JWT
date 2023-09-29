import logo from './logo.svg';
import './App.css';
import Signup from './signup/Signup';
import Login from './login/Login';
import Signout from './signout/Signout';

function App() {
  return (
    <div className="App">
      <Signup />
      <Login />
      <Signout />
    </div>
  );
}

export default App;
