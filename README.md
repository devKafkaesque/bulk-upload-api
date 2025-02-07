🚀 Bulk Upload API
==================

This **Node.js & Express** API enables users to **bulk upload user data** via an **Excel (.xlsx/.csv) file** while ensuring data integrity and validation.It validates the data to ensure:

✅ **Emails are unique & properly formatted**

✅ **Mobile numbers can repeat**

✅ **Invalid rows are logged into an error bucket**

🛠 **Tech Stack**
-----------------

*   **Node.js** with **Express.js**
    
*   **Mongoose** (MongoDB ODM)
    
*   **Multer** for file uploads
    
*   **xlsx** & **csv-parser** for processing Excel/CSV files
    
*   **dotenv** for environment variables
    

📌 **Features**
---------------

*   Accepts **Excel (.xlsx) or CSV** files 📂
    
*   Parses & validates data before inserting it into **MongoDB**
    
*   **Stores errors separately** for debugging ❌
    
*   Returns **success & failure count** in response
    

🚀 **Setup & Installation**
---------------------------

### **1️⃣ Clone the Repository**

```bash
git clone https://github.com/YOUR_USERNAME/bulk-upload-api.git
cd bulk-upload-api
```
### **2️⃣ Install Dependencies**

```bash
npm install
```
### **3️⃣ Set Up Environment Variables**

Create a .env file and add your **MongoDB URI**:

```bash
MONGO_URI=your_mongodb_connection_string
PORT=3000
```
### **4️⃣ Start the Server**

```bash
node server.js
```
📤 **How to Use the API**
-------------------------

### **POST /upload**

*   **Endpoint**: http://localhost:3000/upload
    
*   **Request Type**: multipart/form-data
    
*   **Parameter**: file (Excel/CSV file)
    

### **Using Postman**

1.  **Open Postman**
    
2.  ```bash
    http://localhost:3000/upload
    ```
    
3.  Go to the **Body** tab → **form-data**
    
4.  Add a **key** named file, select type **File**, and upload your Excel/CSV file
    
5.  Click **Send**
    

### **Using cURL**

```bash
curl -X POST "http://localhost:3000/upload" \
-H "Content-Type: multipart/form-data" \
-F "file=@/path/to/your/excel-file.xlsx"
```
📌 Replace /path/to/your/excel-file.xlsx with your actual file path.

📢 **API Response Example**
---------------------------

```bash
{
  "success": 50,
  "failed": 2,
  "errors": [
    {
      "row": { "Email": "invalid-email@" },
      "error": "Invalid Email"
    }
  ]
}
```
🚀 **Future Improvements**
--------------------------

✅ **Enhanced Error Handling**

🔥 **Google Sheets Upload Support**

⚡ **User-Friendly Frontend for Uploads**

📊 **Detailed Upload Reports & Analytics**


💡 **Contributing**
-------------------

Contributions are welcome! Fork the repo, create a feature branch, and submit a PR.📌 **Give this repo a ⭐ if you found it useful!**

📜 **License**
--------------

This project is licensed under the **MIT License**.
