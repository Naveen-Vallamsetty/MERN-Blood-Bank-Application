import React from "react";

const InputType = ({
  labelFor,
  lableText,
  inputType,
  name,
  value,
  onChange,
}) => {
  return (
    <>
      <div>
        <div className="mb-3">
          <label htmlFor={labelFor} className="form-label">
            {lableText}
          </label>
          <input
            type={inputType}
            className="form-control"
            name={name}
            value={value}
            onChange={onChange}
          />
        </div>
      </div>
    </>
  );
};

export default InputType;
