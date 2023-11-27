
-- Create log table
CREATE TABLE log (
  querytime timestamp,
  comment varchar(255)
);

-- Trigger ADD_DONOR_LOG
CREATE OR REPLACE FUNCTION ADD_DONOR_LOG()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO log VALUES
    (CURRENT_TIMESTAMP, 'Inserted new Donor ' || NEW.Donor_ID::varchar);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER ADD_DONOR_LOG
AFTER INSERT
ON Donor
FOR EACH ROW
EXECUTE FUNCTION ADD_DONOR_LOG();

-- Trigger UPD_DONOR_LOG
CREATE OR REPLACE FUNCTION UPD_DONOR_LOG()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO log VALUES
    (CURRENT_TIMESTAMP, 'Updated Donor Details ' || NEW.Donor_ID::varchar);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER UPD_DONOR_LOG
AFTER UPDATE
ON Donor
FOR EACH ROW
EXECUTE FUNCTION UPD_DONOR_LOG();

-- Trigger DEL_DONOR_LOG
CREATE OR REPLACE FUNCTION DEL_DONOR_LOG()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO log VALUES
    (CURRENT_TIMESTAMP, 'Deleted Donor ' || OLD.Donor_ID::varchar);
    RETURN OLD;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER DEL_DONOR_LOG
AFTER DELETE
ON Donor
FOR EACH ROW
EXECUTE FUNCTION DEL_DONOR_LOG();

-- Trigger ADD_PATIENT_LOG
CREATE OR REPLACE FUNCTION ADD_PATIENT_LOG()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO log VALUES
    (CURRENT_TIMESTAMP, 'Inserted new Patient ' || NEW.Patient_ID::varchar);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER ADD_PATIENT_LOG
AFTER INSERT
ON Patient
FOR EACH ROW
EXECUTE FUNCTION ADD_PATIENT_LOG();

-- Trigger UPD_PATIENT_LOG
CREATE OR REPLACE FUNCTION UPD_PATIENT_LOG()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO log VALUES
    (CURRENT_TIMESTAMP, 'Updated Patient Details ' || NEW.Patient_ID::varchar);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER UPD_PATIENT_LOG
AFTER UPDATE
ON Patient
FOR EACH ROW
EXECUTE FUNCTION UPD_PATIENT_LOG();

-- Trigger DEL_PATIENT_LOG
CREATE OR REPLACE FUNCTION DEL_PATIENT_LOG()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO log VALUES
    (CURRENT_TIMESTAMP, 'Deleted Patient ' || OLD.Donor_ID::varchar);
    RETURN OLD;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER DEL_PATIENT_LOG
AFTER DELETE
ON Patient
FOR EACH ROW
EXECUTE FUNCTION DEL_PATIENT_LOG();

-- Trigger ADD_TRASACTION_LOG
CREATE OR REPLACE FUNCTION ADD_TRASACTION_LOG()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO log VALUES
    (CURRENT_TIMESTAMP, 'Added Transaction :: Patient ID : ' || NEW.Patient_ID::varchar || '; Donor ID : ' || NEW.Donor_ID::varchar);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER ADD_TRASACTION_LOG
AFTER INSERT
ON Transaction
FOR EACH ROW
EXECUTE FUNCTION ADD_TRASACTION_LOG();








-- Create the database
-- CREATE DATABASE Organ_Donation;
-- \c Organ-Donation; -- Connect to the database

CREATE OR REPLACE FUNCTION insert_patient(
    in_user_name VARCHAR(20),
    in_user_type CHAR(12),
    in_user_password VARCHAR(20),
    in_patient_name VARCHAR(20),
    in_phone_number NUMERIC(10,0),
    in_blood_type CHAR(2),
    in_patient_address VARCHAR(50)
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

    -- Update the User_ID in the Patient table
--     UPDATE Patient SET User_ID = new_patient_id WHERE Patient_ID = new_patient_id;

    RETURN new_patient_id;
END;
$$ LANGUAGE plpgsql;




CREATE OR REPLACE FUNCTION update_user_id_patient()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE login SET User_ID = NEW.Patient_ID WHERE User_Name = NEW.User_Name;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_user_id_patient_trigger
AFTER INSERT ON Patient
FOR EACH ROW EXECUTE FUNCTION update_user_id_patient();



-- Example Transaction for Patient
DO $$ 
DECLARE 
    success BOOLEAN;
BEGIN
  -- Call the function to insert a new patient
  BEGIN
    PERFORM insert_patient('patient123', 'Patient', 'password123', 'John Doe', 1234567890, 'O+', '123 Main St');
    success := true;
  EXCEPTION
    WHEN OTHERS THEN
    -- Handle errors if necessary
    success := false;
  END;

  -- You can check the 'success' variable for the outcome if needed
END $$;



