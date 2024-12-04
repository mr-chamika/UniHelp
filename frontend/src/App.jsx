import { React } from 'react';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import LandingPage from './Pages/LandingPage/LandingPage';
import Login from './Pages/Login/Login';
import SignUp from './Pages/SignUp/SignUp';
import Home from './Pages/Home/Home';

const App = () => {

  return (

    <div>

      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/home' element={<Home/>}></Route>
        </Routes>
      </BrowserRouter>

    </div>

  );

}

export default App;