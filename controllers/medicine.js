import medicineModel from "../models/medicine.js";

function loadAddMedicinePage(req, res, next){
  const message = req.query.msg ? req.query.msg : "";
  const adminID = req.cookies.adminID ? req.cookies.adminID : "";
  if(adminID){
    res.render("add-medicine", {pageTitle: "Add Medicine", adminID: adminID, message: message, editMode: false});
  }else{
    res.redirect("/admin/login?msg=please log in at first!");
  }
}

async function addMedicine(req, res, next){
  const medicineData = req.body;
  try{
    const isMedicinePresent = await medicineModel.find({mbno: medicineData.mbno});
    if(isMedicinePresent.length > 0){
      await medicineModel.updateOne({mbno: medicineData.mbno}, {$inc: {mqty: medicineData.mqty}, mprice: medicineData.mprice});
      res.status(200).redirect("/add-medicine?msg=medicine was added successfully!");
    }else{
      const newMedicine = new medicineModel(medicineData);
      await newMedicine.save();
      res.status(200).redirect("/add-medicine?msg=medicine was added successfully");
    }
  }catch(err){
    console.log(err.message);
    res.status(500).redirect("/add-medicine?msg=unable to add the medicine!");
  }
}

async function findMedicineByBNo(req, res, next){
  const mbno = req.body.mbno || req.params.mbno || null;
  const adminID = req.cookies.adminID ? req.cookies.adminID : "";
  try{
    const selectedMedicine = await medicineModel.find({mbno: mbno}, "-_id -__v");
    if(selectedMedicine.length > 0){
      res.render("view-medicines", {pageTitle: "View Medicines", adminID: adminID, medicines: selectedMedicine});
    }else{
      res.render("view-medicines", {pageTitle: "View Medicines", adminID: adminID, medicines: []});
    }
  }catch(err){
    console.log(err.message);
    next("unable to find requested medicine!");
  }
}

async function findAllMedicines(req, res, next){
  const adminID = req.cookies.adminID ? req.cookies.adminID : "";
  try{
    const medicines = await medicineModel.find({}, "-__v");
    res.render("view-medicines", {pageTitle: "View Medicines", adminID: adminID, medicines: medicines});
  }catch(err){
    console.log(err.message);
    next("unable to find records!");
  }
}

async function loadEditMedicinePage(req, res, next){
  const mbno = req.params.mbno;
  const adminID = req.cookies.adminID ? req.cookies.adminID : "";
    if(adminID){
      try{
        const medicineToEdit = await medicineModel.findOne({mbno: mbno});
        res.render("add-medicine", {pageTitle: "Edit Medicine Details", prevMedDetails: medicineToEdit, adminID: adminID, editMode: true});
      }catch(err){
        next(err);
      }
    }else{
      res.redirect("/admin/login?msg=please login at first!");
    }
  }

async function editMedicine(req, res, next){
  const medicineData = req.body;
  try{
    await medicineModel.findByIdAndUpdate(medicineData.mid, {$set: {mbno: medicineData.mbno, mname: medicineData.mname, mmanufacturer: medicineData.mmanufacturer, mprice: medicineData.mprice, mqty: medicineData.mqty}});
    res.redirect("/medicines?msg=medicine has been updated successfully!");
  }catch(err){
    res.redirect(`/medicines?msg=unable to edit medicine, error: ${err.message}`);
  }
}

async function deleteMedicine(req, res, next){
  const medID = req.body.mid;
  try{
    await medicineModel.findByIdAndDelete(medID);
    res.redirect("/medicines?msg=the medicine was successfully deleted from record!");
  }catch(err){
    console.log(err.message);
    res.redirect("/medicines?msg=unable to delete the medicine from record!");
  }
}

export { addMedicine, deleteMedicine, editMedicine, findAllMedicines, findMedicineByBNo, loadAddMedicinePage, loadEditMedicinePage };

