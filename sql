CREATE TABLE Appointments (
    id INT IDENTITY(1,1) PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100),
    address VARCHAR(200),
    phone VARCHAR(50),
    notes VARCHAR(MAX),
    created_at DATETIME DEFAULT GETDATE()
);
