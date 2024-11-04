import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import Router components
import { LoginRegister } from './Components/LoginRegister/LoginRegister';
import { ForgotPassword } from './Components/LoginRegister/ForgotPassword'; // Make sure this component exists
import { Checkin } from './Components/LoginRegister/Checkin';
function App() {
  return (
    <Router> {/* Ensure the Router wraps everything that uses routing */}
    <Routes>
      <Route path="/" element={<LoginRegister />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/checkin" element={<Checkin/>} />
    </Routes>
  </Router>
  );
}

export default App;
