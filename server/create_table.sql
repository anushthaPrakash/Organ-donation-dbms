-- FINAL CODE
-- -- Create the database
CREATE DATABASE Organ_Donation;
\c Organ-Donation; -- Connect to the database

-- Table 1: User [Entity]
CREATE TABLE Client ( -- Note: "User" is a reserved keyword, so it needs to be quoted
    User_Name varchar(20) NOT NULL PRIMARY KEY,
    User_Type char(12) NOT NULL,
    User_Password varchar(20) NOT NULL,
	UNIQUE (User_Name, User_Type)
);

-- Table 2: Organization [Entity]
CREATE TABLE Organization(
  Organization_ID SERIAL PRIMARY KEY NOT NULL ,
  Organization_Name varchar(20) NOT NULL,
  Organization_Head varchar(20),
  Organization_Address varchar(50),
  Phone_Number numeric(10,0) NOT NULL
);

-- Table 3: Patient [Entity]
CREATE TABLE Patient(
    Patient_ID SERIAL PRIMARY KEY NOT NULL,
    Patient_Name VARCHAR(20) NOT NULL,
    Phone_Number numeric(10,0) NOT NULL,
    Blood_Type char(2) NOT NULL,
    Patient_Address VARCHAR(50)
);

-- DELETE FROM login;
-- Table 4: Donor [Entity]
CREATE TABLE Donor(
  Donor_ID SERIAL PRIMARY KEY NOT NULL,
  Donor_Name VARCHAR(20) NOT NULL,
  Phone_Number numeric(10,0) NOT NULL,
  Blood_Type char(2) NOT NULL,
  Donor_Address VARCHAR(50)

);

--Table 5: Organ [Entity]
CREATE TABLE Organ (
  Organ_Name varchar(20) PRIMARY KEY NOT NULL
);
INSERT INTO Organ VALUES('Brain');
INSERT INTO Organ VALUES('Heart');
INSERT INTO Organ VALUES('Lungs');
--Relations:

CREATE TABLE login(
    User_Name varchar(20) NOT NULL PRIMARY KEY,
    User_Type char(12) NOT NULL,
    User_ID INTEGER NOT NULL,
    FOREIGN KEY (User_Name, User_Type) REFERENCES Client(User_Name, User_Type) ON DELETE CASCADE  
);

CREATE TABLE Requests (
  Patient_ID INTEGER NOT NULL,
  Organ_Name varchar(20) NOT NULL,
  FOREIGN KEY (Patient_ID) REFERENCES Patient(Patient_ID) ON DELETE CASCADE,
  FOREIGN KEY (Organ_Name) REFERENCES Organ(Organ_Name) ON DELETE CASCADE,
  PRIMARY KEY (Patient_ID, Organ_Name)
);

CREATE TABLE Donates (
  Donor_ID INTEGER NOT NULL,
  Organ_Name varchar(20) NOT NULL,
  FOREIGN KEY (Donor_ID) REFERENCES Donor(Donor_ID) ON DELETE CASCADE,
  FOREIGN KEY (Organ_Name) REFERENCES Organ(Organ_Name) ON DELETE CASCADE,
  PRIMARY KEY (Donor_ID, Organ_Name)
);

CREATE TABLE Pending_Approval (
  Patient_ID INTEGER NOT NULL,
  Organ_Name varchar(20) NOT NULL,
  Donor_ID INTEGER NOT NULL,
  approved BOOLEAN DEFAULT FALSE,
  FOREIGN KEY (Patient_ID, Organ_Name) REFERENCES Requests(Patient_ID, Organ_Name) ON DELETE CASCADE,
  FOREIGN KEY (Donor_ID, Organ_Name) REFERENCES Donates(Donor_ID, Organ_Name) ON DELETE CASCADE,
  PRIMARY KEY (Patient_ID, Organ_Name, Donor_ID)
);

CREATE TABLE Matched (
  Patient_ID INTEGER NOT NULL,
  Organ_Name varchar(20) NOT NULL,
  Donor_ID INTEGER NOT NULL,
  PRIMARY KEY (Patient_ID, Organ_Name, Donor_ID)
);

CREATE TABLE Registered_At (
  Donor_ID INTEGER NOT NULL,
  Organization_ID INTEGER NOT NULL,
  FOREIGN KEY (Donor_ID) REFERENCES Donor(Donor_ID) ON DELETE CASCADE,
  FOREIGN KEY (Organization_ID) REFERENCES Organization(Organization_ID) ON DELETE CASCADE,
  PRIMARY KEY (Donor_ID, Organization_ID)
);

CREATE TABLE Belongs_To (
  Patient_ID INTEGER NOT NULL,
  Organization_ID INTEGER NOT NULL,
  FOREIGN KEY (Patient_ID) REFERENCES Patient(Patient_ID) ON DELETE CASCADE,
  FOREIGN KEY (Organization_ID) REFERENCES Organization(Organization_ID) ON DELETE CASCADE,
  PRIMARY KEY (Patient_ID, Organization_ID)
);

---Login Functions and triggers

CREATE OR REPLACE FUNCTION insert_patient(
    in_user_name VARCHAR(20),
    in_user_type CHAR(12),
    in_user_password VARCHAR(20),
    in_patient_name VARCHAR(20),
    in_phone_number NUMERIC(10,0),
    in_blood_type CHAR(2),
    in_patient_address VARCHAR(50),
    in_organization_id INTEGER -- New parameter for organization_id
)
RETURNS INTEGER AS $$
DECLARE
    new_patient_id INTEGER;
BEGIN
    -- Insert into Patient table
    INSERT INTO Patient(Patient_Name, Phone_Number, Blood_Type, Patient_Address)
    VALUES (in_patient_name, in_phone_number, in_blood_type, in_patient_address)
    RETURNING Patient_ID INTO new_patient_id;

    -- Insert into User table
    INSERT INTO Client(User_Name, User_Type, User_Password)
    VALUES (in_user_name, in_user_type, in_user_password);

    -- Insert into login table
    INSERT INTO login(User_Name, User_Type, User_ID)
    VALUES (in_user_name, in_user_type, new_patient_id);

    -- Insert into Belongs_To table
    INSERT INTO Belongs_To(Patient_ID, Organization_ID)
    VALUES (new_patient_id, in_organization_id);

    RETURN new_patient_id;
END;
$$ LANGUAGE plpgsql;
 
CREATE OR REPLACE FUNCTION insert_donor(
    in_user_name VARCHAR(20),
    in_user_type CHAR(12),
    in_user_password VARCHAR(20),
    in_donor_name VARCHAR(20),
    in_phone_number NUMERIC(10,0),
    in_blood_type CHAR(2),
    in_donor_address VARCHAR(50),
    in_organization_id INTEGER -- New parameter for organization_id
)
RETURNS INTEGER AS $$
DECLARE
    new_donor_id INTEGER;
BEGIN
    -- Insert into Donor table
    INSERT INTO Donor(Donor_Name, Phone_Number, Blood_Type, Donor_Address)
    VALUES (in_donor_name, in_phone_number, in_blood_type, in_donor_address)
    RETURNING Donor_ID INTO new_donor_id;

    -- Insert into Client table
    INSERT INTO Client(User_Name, User_Type, User_Password)
    VALUES (in_user_name, in_user_type, in_user_password);

    -- Insert into login table
    INSERT INTO login(User_Name, User_Type, User_ID)
    VALUES (in_user_name, in_user_type, new_donor_id);

        -- Insert into Belongs_To table
    INSERT INTO Registered_at(Donor_ID, Organization_ID)
    VALUES (new_donor_id, in_organization_id);
--     COMMIT;
    RETURN new_donor_id;
	
END;
$$ LANGUAGE plpgsql;


CREATE OR REPLACE FUNCTION insert_organization(
    in_user_name VARCHAR(20),
    in_user_type CHAR(12),
    in_user_password VARCHAR(20),
    in_organization_name VARCHAR(20),
    in_organization_head VARCHAR(20),
    in_organization_address VARCHAR(50),
    in_phone_number NUMERIC(10,0)
)
RETURNS INTEGER AS $$
DECLARE
    new_organization_id INTEGER;
BEGIN
    -- Insert into Organization table
    INSERT INTO Organization(Organization_Name, Organization_Head, Organization_Address, Phone_Number)
    VALUES (in_organization_name, in_organization_head, in_organization_address, in_phone_number)
    RETURNING Organization_ID INTO new_organization_id;
     RAISE NOTICE 'Flag1';
    -- Insert into Client table
    INSERT INTO Client(User_Name, User_Type, User_Password)
    VALUES (in_user_name, in_user_type, in_user_password);
 RAISE NOTICE 'Flag2';
    -- Insert into login table
    INSERT INTO login(User_Name, User_Type, User_ID)
    VALUES (in_user_name, in_user_type, new_organization_id);
 RAISE NOTICE 'Flag3';
    
    RETURN new_organization_id;
END;
$$ LANGUAGE plpgsql;


--Call when new organ donated
CREATE OR REPLACE FUNCTION Update_Pending_Approval1()
RETURNS TRIGGER AS $$
DECLARE Donor_Blood_Type char(2);
BEGIN
    SELECT Blood_Type INTO Donor_Blood_Type
    FROM Donor
    WHERE Donor_ID=NEW.Donor_ID;
    
    INSERT INTO Pending_Approval(Patient_ID,Organ_Name,Donor_ID,approved)
    SELECT Patient.Patient_ID, NEW.Organ_Name, NEW.Donor_ID, FALSE
    FROM Requests INNER JOIN Patient ON Requests.Patient_ID=Patient.Patient_ID 
    WHERE ((Donor_Blood_Type LIKE '%O%') OR (Donor_Blood_Type LIKE '%A%' AND Blood_Type LIKE '%A%') OR (Donor_Blood_Type LIKE '%B%' AND Blood_Type LIKE '%B%'))AND Organ_Name=NEW.Organ_Name;
	RETURN New;
END;
$$ LANGUAGE plpgsql;


CREATE TRIGGER Organ_Match_Donates
AFTER INSERT ON Donates
FOR EACH ROW
EXECUTE PROCEDURE Update_Pending_Approval1();

--Call when new organ requested
CREATE OR REPLACE FUNCTION Update_Pending_Approval2()
RETURNS TRIGGER AS $$
DECLARE Patient_Blood_Type char(2);
BEGIN
    SELECT Blood_Type INTO Patient_Blood_Type
    FROM Patient
    WHERE Patient_ID=NEW.Patient_ID;
	  
    INSERT INTO Pending_Approval(Patient_ID,Organ_Name,Donor_ID,approved)
    SELECT NEW.Patient_ID, NEW.Organ_Name, Donor.Donor_ID, FALSE
    FROM Donates INNER JOIN Donor ON Donates.Donor_ID=Donor.Donor_ID 
    WHERE ((Blood_Type LIKE '%O%') OR (Blood_Type LIKE '%A%' AND Patient_Blood_Type LIKE '%A%') OR (Blood_Type LIKE '%B%' AND Patient_Blood_Type LIKE '%B%') )AND Organ_Name=NEW.Organ_Name;
	RETURN New;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER Organ_Match_Requests
AFTER INSERT ON Requests
FOR EACH ROW
EXECUTE PROCEDURE Update_Pending_Approval2();

--call when request approved
CREATE OR REPLACE FUNCTION after_donor_approval()
RETURNS TRIGGER AS $$
BEGIN
     INSERT INTO Matched (Patient_ID, Organ_Name, Donor_ID)
     SELECT Patient_ID, Organ_Name, Donor_ID
     FROM Pending_Approval
     WHERE Pending_Approval.approved = TRUE;
    
    CREATE TEMPORARY TABLE temp_approved AS
    SELECT Donor_ID, Organ_Name FROM Pending_Approval WHERE approved=true ;
    
    DELETE FROM Donates
    WHERE (Donor_ID, Organ_Name) IN (SELECT * FROM temp_approved);

    DELETE FROM Requests
    WHERE (Patient_ID, Organ_Name) IN (SELECT * FROM temp_approved);
    RETURN New;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER after_donor_approval_trigger
AFTER UPDATE ON Pending_Approval
FOR EACH ROW
EXECUTE PROCEDURE after_donor_approval();

-- SELECT insert_organization('jack15','Donor','Dono_Jack','pirmal_1 Hospital','kelvin','Delhi',5435446513);
-- SELECT insert_donor('jack13','Donor','Dono_Jack','Jack',6464564435,'A','Delhi',1) ;
-- SELECT insert_patient('john12','Patient','Dono_john','John',6464564432,'A','Delhi',1) ;
-- INSERT INTO Organ VALUES ('Kidney');
-- INSERT INTO Donates VALUES(1, 'Kidney');
-- INSERT INTO Requests VALUES(1, 'Kidney');


-- SELECT *
-- FROM Pending_Approval;


-- UPDATE Pending_Approval
-- SET approved=TRUE;


-- SELECT *
-- FROM Pending_Approval;

-- SELECT *
-- FROM Matched;

-- SELECT * 
-- FROM Requests;

-- SELECT * 
-- FROM Donates;