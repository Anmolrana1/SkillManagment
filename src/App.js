
import './App.css';
import Login from './Componnents/login_signup/Login';
import Signup from './Componnents/login_signup/Signup';
import ResetPassword from './Componnents/Pages/ResetPassword';
import ChangePassword from './Componnents/Pages/ChangePassword';
import UserDashBoard from './Componnents/user/UserDashBoard';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Certificates from './Componnents/user/Certificates';
import Skill from './Componnents/user/Skill';
import ProjectExperence from './Componnents/user/ProjectExperence';
import CertificateForApp from './Componnents/Approver/CertificateForApp';
import ProjectForApp from './Componnents/Approver/ProjectForApp';
import EmployeeDetails from './Componnents/Admin/EmployeeDetails';

function App() {
  return (
    <div className="App">
     <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>}></Route>
        <Route path="/Signup" element={<Signup/>}></Route>
        <Route path="/Reset" element={<ResetPassword/>}></Route>
        <Route path="/ResetPassword" element={<ChangePassword/>}></Route>
        <Route path="/userdashboard" element={<UserDashBoard/>}></Route>
        <Route path="/Certificates" element={<Certificates/>}></Route>
        <Route path="/Skills" element={<Skill/>}></Route>
        <Route path="/ProjectExperence" element={<ProjectExperence/>}></Route>
        <Route path="/CertificateForApp" element={<CertificateForApp/>}></Route>
        <Route path="/ProjectForApproval" element={<ProjectForApp/>}></Route>
        <Route path="/EmployeeDetails" element={<EmployeeDetails/>}></Route>
      </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;














