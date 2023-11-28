import React from "react";
import { useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { useAuth } from "../AuthContext";
import { useNavigate } from 'react-router';


function UserLogin({ type }) {
  const navigate = useNavigate();
  const { setResponse } = useAuth();
  const { responseData } = useAuth();
  const [role, setRole] = useState("0");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");
  const [input3, setInput3] = useState("");
  const [input4, setInput4] = useState(0);
  const [organisationID, setOrganisationID] = useState(0);
  const [request, setRequest] = useState({});

  console.log("in signup :",responseData);


  const apiAccess = async () => {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...(role === "D" && {
          in_user_name: username,
          in_user_type: "D",
          in_user_password: password,
          in_donor_name: input1,
          in_phone_number: parseInt(input4, 10),
          in_blood_type: input2,
          in_donor_address: input3,
          in_organization_id: parseInt(organisationID, 10),
        }),
        ...(role === "O" && {
          in_user_name: username,
          in_user_type: "O",
          in_user_password: password,
          in_organization_name: input1,
          in_organization_head: input2,
          in_organization_address: input3,
          in_phone_number: parseInt(input4, 10),
        }),
        ...(role === "P" && {
          in_user_name: username,
          in_user_type: "P",
          in_user_password: password,
          in_patient_name: input1,
          in_phone_number: parseInt(input4, 10),
          in_blood_type: input2,
          in_patient_address: input3,
          in_organization_id: parseInt(organisationID, 10),
        }),
      }),
    };
  
    try {
      const response = await fetch("http://localhost:3001/signup", requestOptions);
      const responseData = await response.json();
  
      console.log(responseData);
      setResponse(responseData);



      if(responseData.user_type === "D"){
      setTimeout(() => {
        navigate("/donor");
      }, 3000);
    }
    else if(responseData.user_type === "P"){  
      setTimeout(() => {
        navigate("/patient");
      }, 3000);
    }
    else if(responseData.user_type === "O"){
      setTimeout(() => {
        navigate("/organisation-notif");
      }, 3000);
    }

  
      if (!response.ok) {
        // Handle non-successful response (optional)
        console.error("Error response:", responseData);
      }
    } catch (err) {
      // Handle network or other errors
      console.error("Error making the request:", err);
    }
  };
  

  const login_apiAccess = async () => {
    if (type === "1") {
      console.log(username, password);
  
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      };
  
      try {
        const response = await fetch("http://localhost:3001/login", requestOptions);
        const responseData = await response.json();
  
        console.log(responseData);
        setResponse(responseData);

        if(responseData.userType.trim() === "D"){
     
            navigate("/donor");
  
        }
        else if(responseData.userType.trim() === "P"){  
        
            navigate("/patient");
       
        }
        else if(responseData.userType.trim() === "O"){
    
            navigate("/organisation-notif");
      
        }
      } catch (err) {
        console.log("Error making the request:", err);
      }
    }
  };
  

  const handleRoleChange = (selectedRole) => {
    setRole(selectedRole);
  };
  const handleUsernameChange = (e) => {
    // console.log("target val: ",e.target.value);
    // e.preventDefault();
    setUsername(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleInput1Change = (e) => {
    setInput1(e.target.value);
  };
  const handleInput2Change = (e) => {
    setInput2(e.target.value);
  };
  const handleInput3Change = (e) => {
    setInput3(e.target.value);
  };
  const handleInput4Change = (e) => {
    setInput4(e.target.value);
  };
  const handleOrganisationIDChange = (e) => {
    setOrganisationID(e.target.value);
  };

  console.log(role);

  return (
    <div>
      <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div class="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            class="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          {type === "1" ? (
            <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Sign in to your account
            </h2>
          ) : (
            <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Create a new account
            </h2>
          )}
          {/* <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2> */}
        </div>

        <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="p-2">
            <label
              for="email"
              class="block text-sm font-medium leading-6 text-gray-900"
            >
              User Name
            </label>
            <div class="mt-2">
              <input
                id="email"
                name="text"
                type="text"
                autocomplete="text"
                value={username}
                required
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={handleUsernameChange}
              />
            </div>
          </div>

          <div className="p-2">
            <div class="flex items-center justify-between">
              <label
                for="password"
                class="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
              <div class="text-sm">
                <div class="font-semibold text-indigo-600 hover:text-indigo-500">
                  Forgot password?
                </div>
              </div>
            </div>
            <div class="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autocomplete="current-password"
                value={password}
                required
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={handlePasswordChange}
              />
            </div>
          </div>

          <div className="p-2">
            {type === "1" ? (
              <button
                type="submit"
                class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={() => login_apiAccess()}
              >
                Sign in
              </button>
            ) : (
              <button
                type="submit"
                class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                
              >
                Sign Up
              </button>
            )}
          </div>
        </div>
      </div>

      {type === "2" ? (
        <div>
          <div className="p-10">
            <h3 className="mb-4 font-semibold text-lg text-gray-900 text-center">
              Select Role
            </h3>
            <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex">
              <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r">
                <div
                  className="flex items-center ps-3"
                  onClick={() => handleRoleChange("D")}
                >
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
                <div
                  className="flex items-center ps-3"
                  onClick={() => handleRoleChange("P")}
                >
                  <input
                    id="horizontal-list-radio-id"
                    type="radio"
                    value=""
                    name="list-radio"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                  />
                  <label
                    htmlFor="horizontal-list-radio-id"
                    className="w-full py-3 ms-2 text-sm font-medium text-gray-900"
                  >
                    Patient
                  </label>
                </div>
              </li>

              <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r">
                <div
                  className="flex items-center ps-3"
                  onClick={() => handleRoleChange("O")}
                >
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

            {/* <RoleForm type={role} /> */}
          </div>
          {/* Role Form */}
          <div className="p-10">
            <h3 className="mb-4 font-semibold text-lg text-gray-900 text-center">
              Fill the details
            </h3>
            <div class="grid gap-6 mb-6 md:grid-cols-2">
              {role === "D" || role === "P" ? (
                <div>
                  <label
                    for="first_name"
                    class="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="first_name"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="Full Name"
                    value={input1}
                    required
                    onChange={handleInput1Change}
                  />
                </div>
              ) : (
                <div>
                  <label
                    for="first_name"
                    class="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Oganisation Name
                  </label>
                  <input
                    type="text"
                    id="first_name"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="Organisation Name"
                    value={input1}
                    required
                    onChange={handleInput1Change}
                  />
                </div>
              )}
              <div>
                {role === "D" || role === "P" ? (
                  <label
                    for="last_name"
                    class="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Blood Type
                  </label>
                ) : (
                  <label
                    for="last_name"
                    class="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Organisation Head
                  </label>
                )}
                {role === "D" || role === "P" ? (
                  <input
                    type="text"
                    id="last_name"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="e.g : A"
                    value={input2}
                    required
                    onChange={handleInput2Change}
                  />
                ) : (
                  <input
                    type="text"
                    id="last_name"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="Enter POC"
                    value={input2}
                    required
                    onChange={handleInput2Change}
                  />
                )}
              </div>
              <div>
                <label
                  for="company"
                  class="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Address
                </label>
                <input
                  type="text"
                  id="company"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Full Address"
                  value={input3}
                  required
                  onChange={handleInput3Change}
                />
              </div>
              <div>
                <label
                  for="phone"
                  class="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Phone number
                </label>
                <input
                  type="tel"
                  id="phone"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                  placeholder="123-45-678"
                  pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                  value={input4}
                  required
                  onChange={handleInput4Change}
                />
              </div>
            </div>

            {role === "D" || role === "P" ? (
              <div class="mb-6">
                <label
                  for="text"
                  class="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Organisation ID
                </label>
                <input
                  type="number"
                  id="email"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                  placeholder="Enter valid Organisation ID"
                  value={organisationID}
                  required
                  onChange={handleOrganisationIDChange}
                />
              </div>
            ) : (
              <div></div>
            )}

            <div class="flex items-start mb-6">
              <div class="flex items-center h-5">
                <input
                  id="remember"
                  type="checkbox"
                  value=""
                  class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 "
                  required
                />
              </div>
              <label
                for="remember"
                class="ms-2 text-sm font-medium text-gray-900 "
              >
                I agree with the{" "}
                <a href="#" class="text-blue-600 hover:underline ">
                  terms and conditions
                </a>
                .
              </label>
            </div>
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center "
              onClick={apiAccess}
            >
              Submit
            </button>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default UserLogin;
