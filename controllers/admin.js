import bcrypt from "bcrypt";
import adminModel from "../models/admin.js";

function loadAdminLoginPage(req, res, next){
  const message = req.query.msg? req.query.msg : "";
  const adminID = req.cookies.adminID ? req.cookies.adminID : "";
  if(adminID){
    res.redirect("/admin/home?msg=login successful, welcome back admin!");
  }else{
    res.render("login", {pageTitle: "Admin Login", message: message});
  }
}

async function adminLogin(req, res, next){
  const loginData = req.body;
  try{
    const admin = await adminModel.find({aid: loginData.id});
    const didPasswordMatch = await bcrypt.compare(loginData.password, admin[0].apassword);
    if(didPasswordMatch){
      res.cookie("adminID", admin[0].aid, {maxAge: 60*60*1000, httpOnly: true, signed: false});
      res.redirect("/admin/home?msg=login successful, welcome back admin!");
    }else{
      res.redirect("/admin/login?msg=login failed, invalid credentials!");
    }
  }catch(err){
    console.log(err.message);
    next("unable to login!");
  }
}

function adminLogout(req, res, next){
  const adminID = req.cookies.adminID ? req.cookies.adminID : "";
  try{
    if(adminID){
      res.clearCookie("adminID");
      res.redirect("/admin/login?msg=you're logged out!");
    }else{
      res.redirect("/admin/login?msg=you're already logged out!");
    }
  }catch(err){
    next(err.message);
  }
}

function loadAdminRegistrationPage(req, res, next){
  const message = req.query.msg ? req.query.msg : "";
  const adminID = req.cookies.adminID ? req.cookies.adminID : "";
  if(adminID){
    res.redirect("/admin/home?msg=login successful, welcome back admin!");
  }else{
    res.render("registration", {pageTitle: "Admin Registration", message: message});
  }
}

async function adminRegistration(req, res, next){
  const regnData = req.body;
  try{
    const encryptedPassword = await bcrypt.hash(regnData.password, 10);
    const newAdmin = new adminModel({aid: regnData.id, aname: regnData.name, assn: regnData.ssn, aphone: regnData.phone, aemail: regnData.email, apassword: encryptedPassword, isAgreedToTerms: regnData.isAgreedToTerms ? true : false});
    const regInfo = await newAdmin.save();
    if(regInfo){
      res.redirect(`/admin/login?msg=registration successful, your registration ID is ${regInfo._id}`);
    }else{
      res.redirect("/admin/registration?msg=registration failed!");
    }
  }catch(err){
    console.log(err);
    next("unable to register!");
  }
}

function loadAdminHomePage(req, res, next){
  const message = req.query.msg ? req.query.msg : "";
  const adminID = req.cookies.adminID ? req.cookies.adminID : "";
  if(adminID){
    res.render("admin-home", {pageTitle: "Admin Home", message: message, adminID: adminID});
  }else{
    res.redirect("/admin/login?msg=please log in at first!");
  }
}

export { adminLogin, adminLogout, adminRegistration, loadAdminHomePage, loadAdminLoginPage, loadAdminRegistrationPage };

