import { useState } from 'react';

const useInput = (validateInputValue, initialValue) => {
  const [valueProvided, setValueProvided] = useState(initialValue);
  const [isTouched, setIsTouched] = useState(false);

  const isValid = validateInputValue(valueProvided);
  const hasError = !isValid && isTouched;

  const inputChangedHanlder = (event) => {
    setValueProvided(event.target.value);
  };

  const inputBlurHanlder = (event) => {
    setIsTouched(true);
  };

  const resetHandler = () => {
    setValueProvided('');
    setIsTouched(false);
  };

  return {
    value: valueProvided,
    hasError,
    isValid,
    inputChangedHanlder,
    inputBlurHanlder,
    resetHandler,
  };
};

export default useInput;
