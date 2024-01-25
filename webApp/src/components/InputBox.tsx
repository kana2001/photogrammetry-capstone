import React, { useState, ChangeEvent } from 'react';

interface InputBoxProps {
  onInputChange: (value: string) => void;
  placeHolder: string;
}

function InputBox({ onInputChange, placeHolder }: InputBoxProps) {
  // Create a state variable to store the input value in the child component
  const [inputValue, setInputValue] = useState<string>('');

  // Event handler to update the child's state and call the callback function
  const handleInputChangeLocal = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);

    // Call the callback function with the new value to update the parent's state
    onInputChange(newValue);
  };

  return (
    <div>
      {/* Render the input box */}
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChangeLocal}
        placeholder={placeHolder}
      />
    </div>
  );
}

export default InputBox;