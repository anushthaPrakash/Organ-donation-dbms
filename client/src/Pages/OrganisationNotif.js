import React from "react";
import OrgNotif from "../Components/OrgNotif";

function OrganisationNotif() {
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
        Approve the matches to send notification to the donors and patients.
      </p>
      </div>

      <div className="p-10">
      <OrgNotif />
      </div>

      
    </div>
  );
}

export default OrganisationNotif;
