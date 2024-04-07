import logo from './logo.svg';
import './App.css';
import Home from './pages/Home';
import LoginBuyer from './pages/LoginBuyer';
import SignupBuyer from './pages/SignupBuyer';
import {Routes,Route} from "react-router-dom"
import Navbar from './components/common/Navbar';

function App() {
  return (
    <div className="App">
      <Navbar/>
      < Routes>
        <Route path="/" element={<Home/>} />

        <Route
          path="login"
          element={
            // <OpenRoute>
              <LoginBuyer />
            // </OpenRoute>
          }
        />

        <Route
          path="signup"
          element={
            // <OpenRoute>
              <SignupBuyer />
            // </OpenRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
