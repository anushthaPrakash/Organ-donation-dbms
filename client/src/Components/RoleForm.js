import React from "react";

function RoleForm({ type }) {
  return (
    <div className="p-10">
      <form>
        <h3 className="mb-4 font-semibold text-lg text-gray-900 text-center">
          Fill the details
        </h3>
        <div class="grid gap-6 mb-6 md:grid-cols-2">
          {type === "1" ? (
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
                required
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
                required
              />
            </div>
          )}
          <div>
            {type === "1" ? (
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
            {type === "1" ? (
              <input
                type="text"
                id="last_name"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="e.g : A"
                required
              />
            ) : (
              <input
                type="text"
                id="last_name"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Enter POC"
                required
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
              required
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
              required
            />
          </div>
        </div>

        {type === "1" ?
        <div class="mb-6">
        <label for="text" class="block mb-2 text-sm font-medium text-gray-900 ">Organisation Name</label>
        <input type="text" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="Enter valid Organisation" required/>
        </div> :
        <div></div> }
        

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
          <label for="remember" class="ms-2 text-sm font-medium text-gray-900 ">
            I agree with the{" "}
            <a href="#" class="text-blue-600 hover:underline ">
              terms and conditions
            </a>
            .
          </label>
        </div>
        <button
          type="submit"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center "
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default RoleForm;
