import logo from './logo.svg';
import './App.css';
import Page from './Components/Pages';
import SignUp from './Components/SignUp';
import LoggedPage from './Components/LoggedPage';

function App() {
  return (
    <div className="App">
      <header className="App-header">
     <Page/>
     {/* <SignUp/> */}
     {/* <LoggedPage/> */}
      </header>
    </div>
  );
}

export default App;
