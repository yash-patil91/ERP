import Login from "./Components/Login";
import { Routes, Route } from 'react-router-dom'
import Registration from "./Components/Registration";
import Home from "./Components/Home";
import PrivateRoute from "./Components/PrivateRoute";

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/registration' element={<Registration />} />
        <Route path='/home'  element={
                <PrivateRoute>
                  <Home />
                </PrivateRoute>
              } />
      </Routes>
    </>
  );
}

export default App;
