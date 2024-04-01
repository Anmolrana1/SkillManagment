const UserDetails = require("../Models/modelUserDetails").modules.UserDetails;
const ProjectExperience = require("../Models/userModel").modules.ProjectExperience;
const Certificate = require("../Models/userModel").modules.Certificate;
const nodemailer = require("nodemailer");

// Create a transporter with custom TLS options to trust self-signed certificate
const transporter = nodemailer.createTransport({
  service: "outlook",
  auth: {
    user: "yashsharma@jmangroup.com",
    pass: "Ya$290701",
  },
  tls: {
    // Necessary for self-signed certificates
    rejectUnauthorized: false,
  },
});


async function approveCertificate(req, res) {
    const { Empid, command,certificateName } = req.body;
    console.log(Empid, command)
    try {
      const userCertificate = await Certificate.findOne({ Empid: Empid,certificateName:certificateName });
      if (!userCertificate) {
        return res.status(400).json({ error: "Certificate not found" });
      }
      const user = await UserDetails.findOne({ Empid: Empid });
      if (!user) {
        return res.status(400).json({ error: "User not found" });
      }
      let statusMessage = '';
      if (command === "Approve") {
        userCertificate.Status = "Approved";
        statusMessage = 'approved';
      } if (command === "Reject") {
        console.log(Empid, command)
        userCertificate.Status = "Rejected";
        statusMessage = 'rejected';
      }
      await userCertificate.save();
      const mailOptions = {
        from: "yashsharma@jmangroup.com",
        to: "anmolrana@jmangroup.com",
        subject: "Certificate Approval Status",
        text: `Hello ${user.FirstName}, your certificate '${userCertificate.certificateName}' has been ${statusMessage}. You can check the status on our platform. Thank you.`,
      };
      await transporter.sendMail(mailOptions);
      return res.status(200).json({ message: 'Approved' });
    } catch (error) {
      console.error("Error approving certificate:", error);
      return res.status(500).json({ error: "Server error" });
    }
  }
  
  async function approveProject(req, res) {
    const { Empid, command ,projectName} = req.body;
    try {
      const userProject = await ProjectExperience.findOne({ Empid: Empid ,projectName:projectName});
      if (!userProject) {
        return res.status(400).json({ error: "Project not found" });
      }
      const user = await UserDetails.findOne({ Empid: Empid });
      if (!user) {
        return res.status(400).json({ error: "User not found" });
      }
      let statusMessage = '';
      if (command === "Approve") {
        userProject.Status = "Approved";
        statusMessage = 'approved';
      } 
      if (command === "Reject") {
        userProject.Status = "Rejected";
        statusMessage = 'rejected';
      }
      await userProject.save();
      const mailOptions = {
        from: "yashsharma@jmangroup.com",
        to: "anmolrana@jmangroup.com",
        subject: "Project Approval Status",
        text: `Hello ${user.FirstName}, your project '${userProject.projectName}' has been ${statusMessage}. You can check the status on our platform. Thank you.`,
      };
      await transporter.sendMail(mailOptions);
      return res.status(200).json({ message: 'Approved' });
    } catch (error) {
      console.error("Error approving project:", error);
      return res.status(500).json({ error: "Server error" });
    }
  }
  
  async function getEmail(req, res) {
    const { Empid} = req.body;
    console.log(Empid)
    try {
      const user = await Certificate.findOne({ Empid: Empid});
      if (!user) {
        return res.status(400).json({ error: "user not found" });
      }
      const userDetail=await UserDetails.findOne({Empid:Empid})
      const Email=userDetail.Email
      return res.status(200).json({ Email});
    }
      catch (error) {
        console.error("Error approving project:", error);
        return res.status(500).json({ error: "Server error" });
      }
    }
  
  module.exports = { approveCertificate, approveProject ,getEmail};
  