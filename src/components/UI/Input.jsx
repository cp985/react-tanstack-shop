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
    
      <label className={classInput[classOfLabel]} htmlFor={id}>
        {label}
      </label>
      <input
        className={classInput[classOfInput]}
        hidden={hidden}
        type={type}
        id={id}
        name={name}
        value={value}
      />
    </>
  );
}
