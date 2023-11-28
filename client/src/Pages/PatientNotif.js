import React from 'react'
import PatientNotifCard from '../Components/PatientNotifCard'

function PatientNotif() {
  return (
    <div>
    <div class="flex flex-col items-center justify-center w-full  py-12 bg-gray-50 sm:px-6 lg:px-8">
    <h1 class="mb-4 text-3xl font-extrabold text-gray-900 md:text-5xl lg:text-6xl">
      <span class="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
        Donor
      </span>{" "}
      Matches.
    </h1>
    <p class="text-lg font-normal text-gray-500 lg:text-xl ">
      These are some potential matches of Donor found for you after being approved by your registered Organisation.
    </p>
  </div>
  <div className='p-10'>
  <PatientNotifCard/>
  </div>
  
  </div>
  )
}

export default PatientNotif