
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
import UserSidebar from './Componnents/user/UserSidebar';
import { useEffect, useState } from 'react';


function App() {
  const [isLoggedIn,setIsLoggedIn]=useState(false);
  const [role,setrole]=useState('')
  useEffect(() => {
    const role = localStorage.getItem('role');
    setrole(role)
  }, []);
  return (
    <div className="App">
   
     <BrowserRouter>
      <Routes>
                <Route path="/" element={<Login setIsLoggedIn={setIsLoggedIn}/>}></Route>
              
                <Route path="/Signup" element={<Signup isLoggedIn={isLoggedIn}/>} />
                <Route path="/Reset" element={<ResetPassword isLoggedIn={isLoggedIn}/>} />
                <Route path="/ResetPassword" element={<ChangePassword isLoggedIn={isLoggedIn}/>} />
                <Route path="/userdashboard" element={<UserDashBoard isLoggedIn={isLoggedIn}/>} />
                <Route path="/Certificates" element={<Certificates isLoggedIn={isLoggedIn}/>} />
                <Route path="/Skills" element={<Skill isLoggedIn={isLoggedIn}/>} />
                <Route path="/ProjectExperence" element={<ProjectExperence isLoggedIn={isLoggedIn}/>} />
                <Route path="/CertificateForApp" element={<CertificateForApp isLoggedIn={isLoggedIn} role={role}/>} />
                <Route path="/ProjectForApproval" element={<ProjectForApp isLoggedIn={isLoggedIn} role={role}/>} />
                <Route path="/EmployeeDetails" element={<EmployeeDetails isLoggedIn={isLoggedIn} role={role}/>} />
                <Route path="/AddSkill" element={<AddSkill isLoggedIn={isLoggedIn} role={role}/>} />
                <Route path="/UserSidebar" element={<UserSidebar/>}/>
      </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;














