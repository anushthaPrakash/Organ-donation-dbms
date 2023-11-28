import {Routes, Route ,useNavigation} from 'react-router-dom'
import React, { useState, useEffect } from "react";
import PatientNotif from '../Pages/PatientNotif';
import Donor from '../Pages/Donor';
import OrganisationNotif from '../Pages/OrganisationNotif';
import Login from '../Pages/Login';
import SignUp from '../Pages/SignUp';
import Organisation from '../Pages/Organisation';
import Patient from '../Pages/Patient';
import DonorNotif from '../Pages/DonorNotif';

function Router() {
  return (
    <Routes>
        <Route path="/" element={<SignUp/>} />
        <Route path="/patient-notif" element={<PatientNotif />} />
        <Route path="/donor-notif" element={<DonorNotif/>} />
        <Route path="/organisation-notif" element={<OrganisationNotif />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/organisation" element={<Organisation/>} />
        <Route path="/patient" element={<Patient/>} />
        <Route path="/donor" element={<Donor/>} />
    </Routes>
  )
}

export default Router