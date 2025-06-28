
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Signup from './components/signuppage/Signup'
import Loginpage from './components/signuppage/Loginpage'
import ForgotPassword from './components/signuppage/forgotpassword'
import AdminPage from './components/adminpage/AdminPage'
import ManageListing from './components/adminpage/ManageListing' 
import BookingHotel from './components/adminpage/BookingHotel'
import AuthStateListener from './components/components2/AuthStateListner'
const App = () => {
  return (
    <Router>
      <AuthStateListener/>
    <Routes>
         <Route path='/' element={<Signup/>}/>
      <Route path='/login' element={<Loginpage/>}/>
      <Route path='/forgot' element={<ForgotPassword/>}/>
      <Route path='/admin' element={<AdminPage/>}/>
    <Route path='/manage' element={<ManageListing/>}/>
    <Route path="/admin/bookings" element={<BookingHotel />} />
    <Route path='/navbar2'/>
    </Routes>
    </Router>
  )
}

export default App
