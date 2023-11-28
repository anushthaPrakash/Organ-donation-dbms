import React from 'react'
import DonorNotifCard from '../Components/DonorNotifCard'

function DonorNotif() {
  return (
    <div>
    <div class="flex flex-col items-center justify-center w-full  py-12 bg-gray-50 sm:px-6 lg:px-8">
    <h1 class="mb-4 text-3xl font-extrabold text-gray-900 md:text-5xl lg:text-6xl">
      <span class="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
        Potential
      </span>{" "}
      Matches.
    </h1>
    <p class="text-lg font-normal text-gray-500 lg:text-xl ">
      These are some potential matches of Patient request found for you after being approved by your their respective Organisation.
    </p>
  </div>
  <div className='p-10'>
  <DonorNotifCard/>
  </div>
  
  </div>
  )
}

export default DonorNotif