import { React } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './Components/Layout/Layout';
import ForgotPassword from './Pages/ForgotPassword/ForgotPassword';
import Login from './Pages/Login/Login';
import SignUp from './Pages/SignUp/SignUp';
import Home from './Pages/Home/Home';
import Schedule from './Pages/Schedule/Schedule';
import TimeTable from './Pages/TimeTable/TimeTable';
import Calculator from './Pages/Calculator/Calculator';
import Storage from './Pages/Storage/Storage';

const App = () => {

  return (

    <div>

      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/forgotpassword' element={<ForgotPassword />} />

          <Route path='/home' element={<Layout />}>

            <Route path='dashboard' element={<Home />} />
            <Route path='schedule' element={<Schedule />} />
            <Route path='schedule/time-table' element={<TimeTable />} />
            <Route path='calculator' element={<Calculator />} />
            <Route path='storage' element={<Storage />} />

          </Route>

          {/* <Route path='/home/dashboard' element={
            <div>
              <Layout />
              <Home />
            </div>

          } />

          <Route path='/home/schedule' element={
            <div>
              <Layout />
              <Schedule />
            </div>

          } />
          <Route path='/home/schedule/time-table' element={
            <div>
              <Layout />
              <TimeTable />
            </div>

          } /> */}

        </Routes>
      </BrowserRouter>

    </div>

  );

}

export default App;