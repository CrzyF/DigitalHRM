import axios from "axios";
import React, { useState, useRef } from "react";
import Swal from "sweetalert2";
import {
  CountryDropdown,
  RegionDropdown,
  CountryRegionData,
} from "react-country-region-selector";

export default function Enrollacompany({ statevalues, setstatevalues }) {
  const labelclassname = "text-md text-dark-500";
  const regioninputclassname =
    "my-1 border-2 border-grayshade px-2 py-1 w-full text-black focus:border-grayshade font-bold outline-none  text-xl rounded-lg appearance-none translate-y-5 mb-6 transition-all duration-300 ease-in-out";

  const otherinputclassname =
    "mb-3 border-2 border-grayshade px-2 py-1 w-full text-black focus:border-grayshade font-bold outline-none  text-xl rounded-lg appearance-none translate-y-5 mb-6 transition-all duration-300 ease-in-out";
  const inputclassname =
    "focus:appearance-none border-2 border-grayshade px-2 py-1 w-1/2 text-black focus:border-grayshade  outline-none  rounded-lg appearance-none";

  const countryinputclassname =
    "px-2 py-1 w-full text-black focus:border-grayshade  outline-none  text-xl rounded-lg appearance-none";
  const [country, setCountry] = useState("");
  const [region, setRegion] = useState("");

  const [bussinessType, setbussinessType] = useState("");
  const [bussinessname, setbussinessname] = useState("");
  const [accountnumber, setaccountnumber] = useState("");
  const [telephone, settelephone] = useState("");
  const [registrationType, setregistrationType] = useState("");

  // const bussinessType = useRef(null);
  // const bussinessname = useRef(null);
  // const accountnumber = useRef(null);
  // const telephone = useRef(null);
  // const registrationType = useRef(null);

  // const options = useMemo(() => countryList().getData(), [])

  const selectCountry = (val) => {
    setCountry(val);
  };



  const enrollacompany = (e) => {
    e.preventDefault();
    // const country_region=country.toString()+','+region.toString()

    const values = {
      bussinessType: bussinessType,
      bussinessname: bussinessname,
      country: country,
      accountnumber: accountnumber,
      telephone: telephone,
      registrationType: registrationType
    };
    axios
      .post("/api/controllers/paymentvouchercontroller/enrollacompany", values)
      .then((response) => {
        Swal.fire({
          icon: "success",
          title: "Company Enrolled",
          text: response.data._id,
        });
      })
      .catch((e) => {
        Swal.fire({
          icon: "error",
          title: "An errorr occurred please try again later",
        });
      });
  };

  return (
    <div className="container mx-20">
      <div className="container  py-3 bg-grayshade5 flex flex-row justify-start">
        <h2 className="font-bold  text-lg mr-60 uppercase">Enroll a Company / Individual</h2>
      </div>

      <form onSubmit={enrollacompany}>

      <div className="flex flex-col">
          <label className={labelclassname}>Registration Type</label>
          <select
            className={inputclassname}
            onChange={(e) => setregistrationType(e.target.value)}
          >
            <option>Individual</option>
            <option>Company</option>
          </select>
        </div>
        

        <div className="flex flex-col mt-4">
          <label className={labelclassname}>{registrationType === 'Individual' ? 'Name' : 'Business Name' }</label>
          <input required  className={inputclassname}
           onChange={(e) => setbussinessname(e.target.value)}
        />
        </div>

        <div className="flex flex-col mt-4">
          <label className={labelclassname}>Telephone</label>
          <input
            required
            type="number"
            className={inputclassname}
            onChange={(e) => settelephone(e.target.value)}
          />
        </div>

        <div className="flex flex-col mt-4">
          <label className={labelclassname}>Country</label>
          <CountryDropdown
            className={inputclassname}
            value={country}
            onChange={(val) => selectCountry(val)}
          />
        </div>

        <div className="flex flex-col mt-4">
          <label className={labelclassname}>Select Business Type</label>
          <select
            className={inputclassname}
            placeholder="Business Type"
            onChange={(e) => setbussinessType(e.target.value)}
          >
            <option>General Merchants</option>
            <option>Public Institution</option>
            <option>NGO's</option>
            <option>E-commerce</option>
            <option>Other</option>
          </select>

        </div>

        <div className="flex flex-col mt-4">
          <label className={labelclassname}>Account Number</label>
          <input
            required
            className={inputclassname}
            type="number"
            onChange={(e) => setaccountnumber(e.target.value)}
          />
        </div>

        <div className="flex flex-col mt-4">
          <button className="p-2 bg-blue-500 text-white w-1/2">Register</button>
        </div>
      </form>
    </div>
  );
}
