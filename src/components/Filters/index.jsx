"use client";
import { useState } from "react";

const Filters = ({ formData, setFormData }) => {
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
    updateFormData("search", search, { success: true }, true);
  };

  const onSortChange = (event) => {
    const sortBy = event.target.value;
    updateFormData("sortBy", sortBy, { success: true }, true);
  };

  console.log("query is",formData.values)
  return (
    <div className="flex justify-between items-center">
      <div className="flex flex-row gap-1 justify-center items-center">
        <span className="text-[12px] md:text-[14px] lg:text-[16px]">
          Search:{" "}
        </span>
        <input
          type="text"
          className="lg:w-[350px] focus:outline-none px-2 py-2 border rounded-md"
          onChange={(e) => onSearchValue(e.target.value)}
          value={formData.values.search}
        />
      </div>
      <div className="text-[12px] md:text-[14px] lg:text-[16px] flex flex-row gap-1 justify-center items-center">
        <label htmlFor="sortBy" className="pr-1">
          Sort By:
        </label>
        <select
          name="sortBy"
          id="sortBy"
          className="border px-1 py-1 rounded-md focus:outline-none"
          onChange={onSortChange}
          value={formData.values.sortBy}
        >
          <option value="today">Today</option>
          <option value="lastWeek">Last Week</option>
          <option value="lastYear">Last Year</option>
        </select>
      </div>
    </div>
  );
};

export default Filters;
