import React, { useId } from "react";

function SelectField({ options, label, className = "", ...props }, ref) {
  const id = useId();

  return (
    <div className="w-full">
      {label && <label htmlFor={id} className=""></label>}
      <select
        name=""
        id={id}
        {...props}
        ref={ref}
        className={`  px-3 py-2 rounded-lg bg-white text-black outline-none  focus:bg-gray-50 duration-200 broder border-gray-200 w-full ${className}`}
      >
        {/* //loop options conditonally so that if aray of options is empty then wont crash  */}
        {options?.map((option) => (
          <option key={option}> {option}</option>
        ))}
      </select>
    </div>
  );
}

export default React.forwardRef(SelectField);
