'use client'
import { useState } from "react";
import Input from "../Input";

const Filters = () => {
  const initialQueryParamaters = {
    search: "",
    recent: "",
  };
  const [formData, setFormData] = useState({
    values: {
      search: "",
    },
    touched: {
      search: false,
    },
    errors: {
      search: null,
    },
  });

  // function to update the form fields
  function updateFormData(field, value, result, isTouched) {
    setFormData((prevState) => {
      return {
        ...prevState,
        values: {
          ...prevState.values,
          [field]: value,
        },
        errors: {
          ...prevState.errors,
          [field]: result.success,
        },
        touched: {
          ...prevState.touched,
          [field]: isTouched,
        },
      };
    });
  }

  const onSearchValue = (search) => {
    updateFormData("search", search, true, true);
  };
  return (
    <div className="flex justify-between items-center">
      <div className="flex flex-row gap-1 justify-center items-center">
        <span className="text-[12px] md:text-[14px] lg:text-[16px]">
          Search :{" "}
        </span>
        <input
          type="text"
          className="lg:w-[350px] focus:outline-none px-2 py-2 border rounded-md"
          onChange={(e) => onSearchValue(e.target.value)}
          value={formData.values.search}
        />
      </div>
      <div className="text-[12px] md:text-[14px] lg:text-[16px] flex flex-row gap-1 justify-center items-center">
        <label htmlFor="cars" className="pr-1">
          Sort By:
        </label>
        <select name="cars" id="cars" className="border px-1 py-1 rounded-md focus:outline-none">
          <option value="volvo">Today</option>
          <option value="saab">last week</option>
          <option value="mercedes">last year</option>
        </select>
      </div>
    </div>
  );
};

export default Filters;
