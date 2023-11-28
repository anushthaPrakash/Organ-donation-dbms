import React from "react";
<<<<<<< HEAD
import { useAuth } from '../AuthContext';
import { useState } from "react";
import { useNavigate } from 'react-router';

function Patient() {
  const { responseData } = useAuth();
  const navigate = useNavigate();
  const [requestedOrgan, setRequestedOrgan] = useState("");

  console.log(responseData);
=======

function Patient() {
>>>>>>> e60905c94988d94632c9fb42a02f5815923fbd89
  return (
    <div>
      <div class="flex flex-col items-center justify-center w-full  py-12 bg-gray-50 sm:px-6 lg:px-8">
        <h1 class="mb-4 text-3xl font-extrabold text-gray-900 md:text-5xl lg:text-6xl">
          <span class="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
            Request
          </span>{" "}
          Organ.
        </h1>
        <p class="text-lg font-normal text-gray-500 lg:text-xl ">
          You will be notified when a match is found and approved by the
          hospital.
        </p>
      </div>

      <div class="mb-6 p-10">
        <label
          for="large-input"
          class="block mb-2 text-xl font-semibold text-gray-900 "
        >
          Enter Organ{" "}
        </label>
        <input
          type="text"
          id="large-input"
          class="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 "
          placeholder="e.g. Heart/Lungs/Kidney"
<<<<<<< HEAD
          value={requestedOrgan}
          onChange={(e) => setRequestedOrgan(e.target.value)}
=======
>>>>>>> e60905c94988d94632c9fb42a02f5815923fbd89
        />
      </div>


      <div className="text-center">
      <button
        type="button"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 "
<<<<<<< HEAD
        onClick={() => {
          fetch('http://localhost:3001/request', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              organ_name: requestedOrgan,
              patient_id: parseInt(responseData.userId),
            }),
          })
            .then((res) => res.json())
            .then((data) => {
              console.log(data);
              alert(data.message);
            })
            .catch((err) => {
              console.log(err);
              alert(err.message);
            });
        }
        }
=======
>>>>>>> e60905c94988d94632c9fb42a02f5815923fbd89
      >
        Submit Request
      </button>
      </div>
<<<<<<< HEAD
      <div className="text-center mt-4">
      <button
        type="button"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 "
        onClick={()=>{navigate("/patient-notif")}}
      >
        Notification
      </button>
      </div>
=======
>>>>>>> e60905c94988d94632c9fb42a02f5815923fbd89
    </div>
  );
}

export default Patient;
