import express from "express";
import { addMedicine, editMedicine, findAllMedicines, findMedicineByBNo, loadAddMedicinePage, loadEditMedicinePage, deleteMedicine } from "../controllers/medicine.js";

const router = express.Router();

router.get("/add-medicine", loadAddMedicinePage);
router.post("/add-medicine", addMedicine);
router.get("/medicines/:mbno", findMedicineByBNo);
router.get("/medicines", findAllMedicines);
router.post("/medicines", findMedicineByBNo);
router.get("/edit-medicine/:mbno", loadEditMedicinePage);
router.post("/edit-medicine", editMedicine);
router.post("/delete-medicine", deleteMedicine);

export default router;