import logo from './logo.svg';
import './App.css';
import Signup from './signup/Signup';
import Login from './login/Login';
import Signout from './signout/Signout';
import Nav from './nav/Nav';

function App() {
  return (
    <div className="App">
      <Signup />
      <Login />
      <Signout />
      <Nav />
    </div>
  );
}

export default App;
