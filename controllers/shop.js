function loadHomePage(req, res, next){
  const message = req.query.msg? req.query.msg : "";
  const adminID = req.cookies.adminID ? req.cookies.adminID : "";
  res.render("index", {pageTitle: "Home", adminID: adminID, message: message});
}

export default loadHomePage;