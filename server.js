const express = require("express");
const sql = require("mssql");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// SQL Server connection
const dbConfig = {
    user: "YOUR_USERNAME",
    password: "YOUR_PASSWORD",
    server: "YOUR_SERVER_NAME",
    database: "YOUR_DATABASE",
    options: {
        trustServerCertificate: true
    }
};

// Insert Appointment
app.post("/api/add", async (req, res) => {
    const { name, email, address, phone, notes } = req.body;

    try {
        let pool = await sql.connect(dbConfig);

        await pool.request()
            .input("name", sql.VarChar, name)
            .input("email", sql.VarChar, email)
            .input("address", sql.VarChar, address)
            .input("phone", sql.VarChar, phone)
            .input("notes", sql.VarChar, notes)
            .query(`
                INSERT INTO Appointments (name, email, address, phone, notes)
                VALUES (@name, @email, @address, @phone, @notes)
            `);

        res.send({ success: true, message: "Inserted!" });
    } catch (error) {
        res.status(500).send({ success: false, error });
    }
});

// Get All Appointments
app.get("/api/list", async (req, res) => {
    try {
        let pool = await sql.connect(dbConfig);
        let result = await pool.request().query("SELECT * FROM Appointments ORDER BY id DESC");

        res.send(result.recordset);
    } catch (error) {
        res.status(500).send({ success: false, error });
    }
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
