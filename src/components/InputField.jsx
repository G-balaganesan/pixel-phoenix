import React from 'react';

const InputField = ({ label, type, options, value, onChange }) => {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 mb-2">{label}</label>
      {type === 'select' ? (
        <select
          value={value}
          onChange={onChange}
          className="w-full px-3 py-2 border rounded-lg"
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          value={value}
          onChange={onChange}
          className="w-full px-3 py-2 border rounded-lg"
        />
      )}
    </div>
  );
};

export default InputField;