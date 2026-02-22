import classInput from "./style/Input.module.css";
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
  defaultValue
}) {
  if (type === "textarea") {
    return (
      <>
        <label htmlFor={id}>{label}</label>
        <textarea id={id} name={name}></textarea>;
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
