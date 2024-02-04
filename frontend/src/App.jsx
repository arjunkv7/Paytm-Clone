import { BrowserRouter as Router, Route, Routes, Navigate  } from 'react-router-dom';
import { Dashboard } from './pages/Dashboard';
import { Signup } from "./pages/Signup";
import { Signin } from "./pages/Signin";
import { SendMoney } from "./pages/SendMoney";
// import 'mdb-react-ui-kit/dist/css/mdb.min.css';
// import "@fortawesome/fontawesome-free/css/all.min.css";

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path='/dashboard' Component={Dashboard}/>
            <Route path='/signin' Component={Signin}/>
            <Route path='/signup' Component={Signup}/>
            <Route path='/send' Component={SendMoney}/>
            <Route path='/' element={<Navigate to="/dashboard" />}/>

        </Routes>
      </Router>
    </>
  )
}

export default App
