import { useState } from 'react';

const useInput = (validateInputValue) => {
  const [valueProvided, setValueProvided] = useState('');
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
