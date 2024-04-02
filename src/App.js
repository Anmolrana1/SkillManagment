
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
import AddSkill from './Componnents/Admin/AddSkill';
import { useState } from 'react';

function App() {
  const [isLoggedIn,setIsLoggedIn]=useState(false);
  return (
    <div className="App">
   
     <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login setIsLoggedIn={setIsLoggedIn}/>}></Route>
        {isLoggedIn ? (
              <>
                <Route path="/Signup" element={<Signup />} />
                <Route path="/Reset" element={<ResetPassword />} />
                <Route path="/ResetPassword" element={<ChangePassword />} />
                <Route path="/userdashboard" element={<UserDashBoard />} />
                <Route path="/Certificates" element={<Certificates />} />
                <Route path="/Skills" element={<Skill />} />
                <Route path="/ProjectExperence" element={<ProjectExperence />} />
                <Route path="/CertificateForApp" element={<CertificateForApp />} />
                <Route path="/ProjectForApproval" element={<ProjectForApp />} />
                <Route path="/EmployeeDetails" element={<EmployeeDetails />} />
                <Route path="/AddSkill" element={<AddSkill />} />
              </>
            ) : <Route path="/" element={<Login setIsLoggedIn={setIsLoggedIn}/>}></Route>}
      </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;














