import './App.css';
import Home from './pages/Home';
import LoginBuyer from './pages/LoginBuyer';
import SignupBuyer from './pages/SignupBuyer';
import {Routes,Route} from "react-router-dom"
import Navbar from './components/common/Navbar';
import OpenRoute from './components/core/Auth/OpenRoute';
import PrivateRoute from './components/core/Auth/PrivateRoute';
import Dashboard from './pages/Dashboard';
import MyProfile from './components/core/Dashboard/MyProfile';

function App() {
  return (
    <div className="w-screen min-h-screen font-inter flex flex-col">
      <Navbar/>
      < Routes>
        <Route path="/" element={<Home/>} />

        <Route
          path="/login"
          element={
             <OpenRoute>
              <LoginBuyer />
             </OpenRoute>
          }
        />

        <Route
          path="/signup"
          element={
              <OpenRoute>
              <SignupBuyer />
              </OpenRoute>
          }
        />

        <Route
          element={
            <PrivateRoute>
              <Dashboard/>
            </PrivateRoute>
          }
        >
          <Route path="/dashboard/my-profile" element={<MyProfile/>}/> 
        </Route>  
      </Routes>
    </div>
  );
}

export default App;
