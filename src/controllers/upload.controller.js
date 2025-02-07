import UsersModel from "../models/Users.model.js";
import xlsx from "xlsx";
import fs from "fs";

export const uploadController = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // Read the uploaded Excel file
    const workbook = xlsx.readFile(req.file.path);
    const sheetName = workbook.SheetNames[0];
    const jsonData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

    if (jsonData.length === 0) {
      return res.status(400).json({ message: "Uploaded file is empty" });
    }

    const errorBucket = [];
    const userDocuments = [];
    const existingAppointments = new Set();

    // Extract all appointment dates in one query (batch fetch)
    const allAppointmentDates = jsonData
      .map(row => row["Appointment Date"])
      .filter(date => date && !isNaN(Date.parse(date)))
      .map(date => new Date(date).toISOString());

    if (allAppointmentDates.length > 0) {
      const existingUsers = await UsersModel.find({
        appointmentDate: { $in: allAppointmentDates }
      });

      existingUsers.forEach(user => existingAppointments.add(user.appointmentDate.toISOString()));
    }

    // Process each row in the Excel file
    for (const row of jsonData) {
      if (!row.Email || !/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/.test(row.Email)) {
        errorBucket.push({ row, error: `Invalid Email` });
        continue; // Skip invalid email
      }

      const appointmentDate = row["Appointment Date"] && !isNaN(Date.parse(row["Appointment Date"]))
        ? new Date(row["Appointment Date"])
        : null;

      if (appointmentDate && existingAppointments.has(appointmentDate.toISOString())) {
        errorBucket.push({
          row,
          error: `Appointment Date ${appointmentDate.toISOString()} already exists.`,
        });
        continue; // Skip duplicate appointment dates
      }

      userDocuments.push({
        agentCode: row["Agent Code"],
        firstName: row["Agent First Name"],
        lastName: row["Agent Last Name"],
        email: row["Email"],
        mobile: row["Mobile Number"],
        channel: row["Channel"],
        designation: row["Designation"],
        rank: row["Rank"],
        branch: row["Branch"],
        appointmentDate,
        validUpto: row["Valid Upto"] ? new Date(row["Valid Upto"]) : null,
        caNumber: row["CA Number"],
        tinNumber: row["TIN Number"],
        province: row["Province"],
        city: row["City"],
        pinCode: row["Pin Code"],
        subagentCode: row["Subagent Code"],
        status: row["Status"],
        reportingManagerId: row["Reporting Manager ID"],
      });
    }

    // Batch insert all valid user documents
    let insertedCount = 0;
    if (userDocuments.length > 0) {
      try {
        await UsersModel.insertMany(userDocuments);
        insertedCount = userDocuments.length;
      } catch (error) {
        errorBucket.push({ error: `Bulk Insert Error: ${error.message}` });
      }
    }

    res.status(201).json({
      success: insertedCount,
      failed: errorBucket.length,
      errors: errorBucket,
    });
    console.log(req.file);
  } catch (error) {
    res.status(500).json({ message: error.message });
  } finally {
    // Ensure file is deleted even if an error occurs
    if (fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
  }
};
