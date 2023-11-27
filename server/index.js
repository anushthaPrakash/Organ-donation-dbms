const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello from DBMS!');
});

app.listen(3001, () => {
  console.log(`Server is running on port 3001`);
});

// app.get('/home', (req, res) => {
//   if (!req.session.login) {
//     res.status(401).render('login.html'); // Adjust this based on your view/template engine
//   } else {
//     if (req.session.isAdmin) {
//       res.render('home.html', { username: req.session.username });
//     } else {
//       // Call your home_student function or route handler here
//     }
//   }
// });

app.post('/signup',async(req,res)=>{
  try {
    // Check if the username is already taken
    const usernameCheck = await pool.query('SELECT * FROM Client WHERE User_Name = $1', [req.body.in_user_name]);
    if (usernameCheck.rows.length > 0) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    const hashedPassword = await bcrypt.hash(req.body.in_user_password,6);
    
    let newUser;
    if(userType==='Patient'){
      const {in_user_name,in_user_type,in_user_password,in_patient_name,in_phone_number,in_blood_type,in_patient_address,in_organization_id}=req.body;
      newUser = await pool.query(
        'SELECT insert_patient($1,$2,$3,$4,$5,$6,$7,$8) as new_patient_id',
        [in_user_name,in_user_type,in_user_password,in_patient_name,in_phone_number,in_blood_type,in_patient_address,in_organization_id]
      );
    }
    else if(userType==='Donor'){
      const {in_user_name,in_user_type,in_user_password,in_donor_name,in_phone_number,in_blood_type,in_donor_address,in_organization_id}=req.body;
      newUser = await pool.query(
        'SELECT insert_patient($1,$2,$3,$4,$5,$6,$7,$8) as new_donor_id',
        [in_user_name,in_user_type,in_user_password,in_patient_name,in_phone_number,in_blood_type,in_donor_address,in_organization_id]
      );
    }
    else if(userType==='Organization'){
      const {in_user_name,in_user_type,in_user_password,in_organization_name,in_organization_head,in_organization_address,in_phone_number}=req.body;
      newUser = await pool.query(
        'SELECT insert_patient($1,$2,$3,$4,$5,$6,$7) as new_organization_id',
        [in_user_name,in_user_type,in_user_password,in_organization_name,in_organization_head,in_organization_address,in_phone_number]
      );
    }
    else
    {
      return res.status(400).json({ error: 'Invalid user type' });
    }
    res.status(201).json({ message: 'User created successfully', user: newUser.rows[0], });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error"); 
  }
});

app.post('/login', async (req, res) => {
  try {
    const { username, userType,password } = req.body;

    // Check if the username exists in the database
    const user = await pool.query('SELECT * FROM Client WHERE User_Name = $1', [username]);

    if (user.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Compare the provided password with the hashed password from the database
    const passwordMatch = await bcrypt.compare(password, user.rows[0].password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    const user1=await pool.query('SELECT User_ID FROM Login WHERE User_Name = $1', [username]);

    // Password is correct, you can create a session or token for authentication

    // Respond with a success message or token
    res.status(200).send(user1.rows[0].User_ID);

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//submission of a request
app.post('/request',async(req,res)=>{
  try {
    const patient_id=req.body.patient_id;
    const organ_name=req.body.organ_name;
    const request= await pool.query("INSERT INTO Request(Patient_ID,Organ_Name) VALUES($1,$2) RETURNING *",[patient_id,organ_name]);
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



//logout if needed
app.post('/logout', (req, res) => {

});


