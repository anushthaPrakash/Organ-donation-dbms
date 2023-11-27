import React from "react";
import { useState } from "react";
import RoleForm from "./RoleForm";

function SelectRole() {
  const [role, setRole] = useState("0");

  const handleRoleChange = (selectedRole) => {
    setRole(selectedRole);
  };
  console.log(role);

  return (
    <div className="p-10">
      <h3 className="mb-4 font-semibold text-lg text-gray-900 text-center">Select Role</h3>
      <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex">
        <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r">
          <div className="flex items-center ps-3" onClick={() => handleRoleChange("1")}>
            <input
              id="horizontal-list-radio-license"
              type="radio"
              value=""
              name="list-radio"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
            />
            <label
              htmlFor="horizontal-list-radio-license"
              className="w-full py-3 ms-2 text-sm font-medium text-gray-900"
            >
              Donor
            </label>
          </div>
        </li>

        <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r">
          <div className="flex items-center ps-3" onClick={() => handleRoleChange("2")}>
            <input
              id="horizontal-list-radio-id"
              type="radio"
              value=""
              name="list-radio"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
            />
            <label htmlFor="horizontal-list-radio-id" className="w-full py-3 ms-2 text-sm font-medium text-gray-900">
              Patient
            </label>
          </div>
        </li>

        <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r">
          <div className="flex items-center ps-3" onClick={() => handleRoleChange("3")}>
            <input
              id="horizontal-list-radio-military"
              type="radio"
              value=""
              name="list-radio"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
            />
            <label
              htmlFor="horizontal-list-radio-military"
              className="w-full py-3 ms-2 text-sm font-medium text-gray-900"
            >
              Organisation
            </label>
          </div>
        </li>
      </ul>

      <RoleForm type={role} />
    </div>
  );
}

export default SelectRole;

