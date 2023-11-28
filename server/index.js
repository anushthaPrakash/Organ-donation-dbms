const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db');
// const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use(cors());
app.use(express.json());

app.listen(3001, () => {
    console.log(`Server is running on port 3001`);
  });

app.get('/', (req, res) => {
  res.send('Hello from DBMS!');
});




app.post('/signup',async(req,res)=>{
  const userType=req.body.in_user_type;
<<<<<<< HEAD
  // console.log("user type from client: ",userType);
  // console.log(req.body);
=======
  console.log(req.body);
>>>>>>> e60905c94988d94632c9fb42a02f5815923fbd89
  try {
    // Check if the username is already taken
    const usernameCheck = await pool.query('SELECT * FROM Client WHERE User_Name = $1', [req.body.in_user_name]);
    if (usernameCheck.rows.length > 0) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    // const hashedPassword = await bcrypt.hash(req.body.in_user_password,6);
    
<<<<<<< HEAD
    // let newUser;
    if(userType==='P'){
      const {in_user_name,in_user_type,in_user_password,in_patient_name,in_phone_number,in_blood_type,in_patient_address,in_organization_id}=req.body;
      const newUser = await pool.query(
        'SELECT insert_patient($1,$2,$3,$4,$5,$6,$7,$8) as new_patient_id',
        [in_user_name,in_user_type,in_user_password,in_patient_name,in_phone_number,in_blood_type,in_patient_address,in_organization_id]
      );
      // console.log("usertype from db: ", newUser.rows[0].new_patient_id);
      res.status(201).json({ message: 'Patient created successfully', user_type:userType, userId:newUser.rows[0].new_patient_id});
    }
    else if(userType==='D'){
      const {in_user_name,in_user_type,in_user_password,in_donor_name,in_phone_number,in_blood_type,in_donor_address,in_organization_id}=req.body;
      const newUser = await pool.query(
        'SELECT insert_donor($1,$2,$3,$4,$5,$6,$7,$8) as new_donor_id',
        [in_user_name,in_user_type,in_user_password,in_donor_name,in_phone_number,in_blood_type,in_donor_address,in_organization_id]
      );
      // console.log("user id from db: ", newUser.rows[0]);
      res.status(201).json({ message: 'Donor created successfully', user_type:userType, userId:newUser.rows[0].new_donor_id});
    }
    else if(userType==='O'){
      const {in_user_name,in_user_type,in_user_password,in_organization_name,in_organization_head,in_organization_address,in_phone_number}=req.body;
      const newUser = await pool.query(
        'SELECT insert_organization($1,$2,$3,$4,$5,$6,$7) as new_organization_id',
        [in_user_name,in_user_type,in_user_password,in_organization_name,in_organization_head,in_organization_address,in_phone_number]
      );
      // console.log("user id from db: ", newUser.rows[0].new_organization_id);
      res.status(201).json({ message: 'Organisation created successfully', user_type:userType, userId:newUser.rows[0].new_organization_id});
      // res.status(201).json({ message: 'User created successfully'});
=======
    let newUser;
    if(userType==='P'){
      const {in_user_name,in_user_type,in_user_password,in_patient_name,in_phone_number,in_blood_type,in_patient_address,in_organization_id}=req.body;
      newUser = await pool.query(
        'SELECT insert_patient($1,$2,$3,$4,$5,$6,$7,$8) as new_patient_id',
        [in_user_name,in_user_type,in_user_password,in_patient_name,in_phone_number,in_blood_type,in_patient_address,in_organization_id]
      );
    }
    else if(userType==='D'){
      const {in_user_name,in_user_type,in_user_password,in_donor_name,in_phone_number,in_blood_type,in_donor_address,in_organization_id}=req.body;
      newUser = await pool.query(
        'SELECT insert_donor($1,$2,$3,$4,$5,$6,$7,$8) as new_donor_id',
        [in_user_name,in_user_type,in_user_password,in_donor_name,in_phone_number,in_blood_type,in_donor_address,in_organization_id]
      );
    }
    else if(userType==='O'){
      const {in_user_name,in_user_type,in_user_password,in_organization_name,in_organization_head,in_organization_address,in_phone_number}=req.body;
      newUser = await pool.query(
        'SELECT insert_organization($1,$2,$3,$4,$5,$6,$7) as new_organization_id',
        [in_user_name,in_user_type,in_user_password,in_organization_name,in_organization_head,in_organization_address,in_phone_number]
      );
>>>>>>> e60905c94988d94632c9fb42a02f5815923fbd89
    }
    else
    {
      return res.status(400).json({ error: 'Invalid user type' });
    }
<<<<<<< HEAD
    
    
    
=======
    res.status(201).json({ message: 'User created successfully', userType:user.rows[0].User_Type, userId:user.rows[0].User_ID});
>>>>>>> e60905c94988d94632c9fb42a02f5815923fbd89
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error"); 
  }
});

app.post('/login', async (req, res) => {
  try {
    const {username,password}=req.body;
    const user=await pool.query('SELECT * FROM Client WHERE User_Name = $1', [username]);
<<<<<<< HEAD

    if (user.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid username' });
    }

    if(user.rows[0].user_password!==password){
      return res.status(401).json({ error: 'Invalid password' });
    }
    const login=await pool.query('SELECT * FROM login WHERE User_Name = $1', [username]);
   

    res.status(200).json({
     // userId:user.rows[0].User_ID,
      message:"Login Successful",
      userType:user.rows[0].user_type,
      userId:login.rows[0].user_id
=======
    if (user.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    if(user.rows[0].password!==password){
      return res.status(401).json({ error: 'Invalid username or password' });
    }
    res.status(200).send({
      userType:user.rows[0].User_Type,
      userId:user.rows[0].User_ID,
      message:"Login Successful"
>>>>>>> e60905c94988d94632c9fb42a02f5815923fbd89
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

<<<<<<< HEAD


app.post('/getPendingApprovals', async (req, res) => {
  try {
    const organizationId = req.body.organizationId;
    const patientResult = await pool.query(
      'SELECT Patient_ID FROM Belongs_To WHERE Organization_ID = $1',
      [organizationId]
    );

    if (patientResult.rows.length === 0) {
      return res.status(404).json({ error: 'No patient found for the given organization' });
    }

    const patientId = patientResult.rows[0].Patient_ID;

    // Step 2: Get all entries from the Pending_Approval table using the obtained Patient_ID
    const pendingApprovalsResult = await pool.query(
      'SELECT * FROM Pending_Approval WHERE Patient_ID = $1',
      [patientId]
    );
    console.log(pendingApprovalsResult);
    res.status(200).json({"helooo": pendingApprovalsResult.rows});
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post("/getPendingApprovals/:organizationId/approval",async(req,res)=>{
  try {
    const {patient_id,organ_name,dono_id}=req.body;

    const updated_query=await pool.query(
      'UPDATE Pending_Approval SET approved=TRUE WHERE Patient_ID=$1 AND Organ_Name=$2 AND Donor_ID=$3 RETURNING *',
      [patient_id,organ_name,dono_id]
=======
app.post("/approval",async(req,res)=>{
  try {
    const approved=req.body.approved;

    const updated_query=await pool.query(
      'UPDATE Pending_Approval SET approved=TRUE RETURNING *'
>>>>>>> e60905c94988d94632c9fb42a02f5815923fbd89
    );

    res.status(200).json({message:"Approval done successfully"});

  } catch (error) {
    console.log(err);
    res.status(500).send("Server Error");
  }
});


<<<<<<< HEAD
=======

>>>>>>> e60905c94988d94632c9fb42a02f5815923fbd89
//submission of a request
app.post('/request',async(req,res)=>{
  try {
    const patient_id=req.body.patient_id;
    const organ_name=req.body.organ_name;
    const request= await pool.query("INSERT INTO Requests(Patient_ID,Organ_Name) VALUES($1,$2) RETURNING *",[patient_id,organ_name]);
    res.status(200).json({message:"Request submitted successfully"});
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");    
  }
});


//submission of a donation
app.post('/donation',async(req,res)=>{
  try {
    const donor_id=req.body.donor_id;
    const organ_name=req.body.organ_name;
    const donation= await pool.query("INSERT INTO Donates(Donor_ID,Organ_Name) VALUES($1,$2) RETURNING *",[donor_id,organ_name]);
    res.status(200).json({message:"Donation done successfully"});

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});


<<<<<<< HEAD
app.post('/donor-notif', async (req, res) => {
  try {
    const donorID = req.body.userID; // Assuming the attribute you send in the request is 'donorID'
    
    // Fetch matched tuples for the specified donorID
    const queryResult = await pool.query(
      'SELECT * FROM Matched WHERE Donor_ID = $1',
      [donorID]
    );

    const matchedTuples = queryResult.rows;

    res.json({ success: true, matchedTuples });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});



app.post('/patient-notif', async (req, res) => {
  try {
    const patientID = req.body.userID; // Assuming the attribute you send in the request is 'patientID'

    // Fetch matched tuples for the specified patientID
    const queryResult = await pool.query(
      'SELECT * FROM Matched WHERE Patient_ID = $1',
      [patientID]
    );

    const matchedTuples = queryResult.rows;

    res.json({ success: true, matchedTuples });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

=======
>>>>>>> e60905c94988d94632c9fb42a02f5815923fbd89

//logout if needed
app.post('/logout', (req, res) => {

});

<<<<<<< HEAD
=======

>>>>>>> e60905c94988d94632c9fb42a02f5815923fbd89
