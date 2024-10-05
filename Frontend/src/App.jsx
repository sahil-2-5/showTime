import React from 'react' ;
import { BrowserRouter , Routes , Route } from "react-router-dom";
import CompHub from './Components/User/CompHub';
import Login from './Components/User/Login';
import Signup from './Components/User/Signup';
import AdminSignup from './Components/Admin/AdminSignup';
import AdminLogin from './Components/Admin/AdminLogin';
import AdminPanel from './Components/Admin/AdminPanel';
import AddMovie from './Components/Admin/AddMovie';
import AllMovie from './Components/Admin/AllMovie';
import UpdateMovie from './Components/Admin/UpdateMovie';
import MoviePage from './Components/User/MoviePage';
import Cinema from './Components/User/Cinema';
import SeatSelection from './Components/User/SeatSelection';
import Payment from './Components/User/Payment';
import Ticket from './Components/User/Ticket';
import About from './Components/User/About';
import Category from './Components/User/Category';

const App = () => {
  return(
    <>
      <BrowserRouter>
        <Routes>

          {/* User routes */}
          
          <Route path="/" element={ <CompHub/> }></Route>
          <Route path="/Login" element={ <Login/> }></Route>
          <Route path="/signup" element={ <Signup/> }></Route>

          <Route path="/moviePage/:id" element={ <MoviePage/> }></Route>
          <Route path="/cinema/:id" element={ <Cinema/> }></Route>
          <Route path="/bookseat/:id" element={ <SeatSelection/> }></Route>
          <Route path="/about" element={ <About/> }></Route>
          <Route path="/category" element={ <Category/> }></Route>

          <Route path="/payment/:id" element={ <Payment/> }></Route>

          <Route path="/ticket/:id" element={ <Ticket/> }></Route>

          {/* Admin routes */}

          <Route path="/adminSignup" element={ <AdminSignup/> }></Route>
          <Route path="/adminLogin" element={ <AdminLogin/> }></Route>

          <Route path="/adminPanel" element={ <AdminPanel/> }>
            <Route path="addMovie" element={ <AddMovie/> } />
            <Route path="allMovie" element={ <AllMovie/> } />
            <Route path="updateMovie/:id" element={ <UpdateMovie/> } />
          </Route>

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App