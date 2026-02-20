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
        value={value}
        onChange={onChange}
        min={min}
        max={max}
        step={step}
      />
      <label className={classInput[classOfLabel]} htmlFor={id}>
        {label}
      </label>
    </>
  );
}
