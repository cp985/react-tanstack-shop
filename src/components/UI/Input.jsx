import classInput from "./style/Input.module.css";
import Button from "./Button";
import {useState} from "react";
import {Eye, EyeOff} from 'pixelarticons/react'
export default function Input({
  classOf,
  hidden,
  type,
  id,
  name,
  label,
  value,
  classOfLabel,
  classOfInput,
  onChange,
  min,
  max,
  step,
  placeholder,
  defaultValue,
  rows,
}) {
  const [isPassword, setIsPassword] = useState(true);

  function togglePassword(e) {
    e.preventDefault();

    setIsPassword(!isPassword);
  }
  if (type === "textarea") {
    return (
      <>
        <label htmlFor={id}>{label}</label>
        <textarea
          onChange={onChange}
          value={value}
          className={classInput[classOf]}
          rows={rows}
          id={id}
          name={name}
          placeholder={placeholder}
        ></textarea>
      </>
    );
  }
  if (type === "password") {
    return (
      <>
        <div className={classInput['classSecondary']}>
          <input
            className={classInput[classOfInput]}
            hidden={hidden}
           type={isPassword ? "password" : "text"}
            id={id}
            name={name}
            onChange={onChange}
            min={min}
            max={max}
            step={step}
            placeholder={placeholder}
            {...(value !== undefined ? { value } : { defaultValue })}
          />
          <Button classOf="secondaryButton" onClick={togglePassword}>{isPassword ? <Eye/> : <EyeOff/>}</Button>
        </div>
        <label className={classInput[classOfLabel]} htmlFor={id}>
          {label}
        </label>
      </>
    );
  }
  return (
    <>
      <input
        className={classInput[classOfInput]}
        hidden={hidden}
        type={type}
        id={id}
        name={name}
        onChange={onChange}
        min={min}
        max={max}
        step={step}
        placeholder={placeholder}
        {...(value !== undefined ? { value } : { defaultValue })}
      />
      <label className={classInput[classOfLabel]} htmlFor={id}>
        {label}
      </label>
    </>
  );
}
