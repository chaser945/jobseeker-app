const FormRowSelect = ({
  id,
  name,
  labelText,
  value,
  optionsList,
  handleChange,
}) => {
  return (
    <>
      <label htmlFor={id} className="form-label">
        {labelText || name}
      </label>
      <select
        id={id}
        name={name}
        value={value}
        onChange={handleChange}
        className="form-select"
      >
        {optionsList.map((c, i) => {
          return (
            <option key={i} value={c}>
              {c}
            </option>
          )
        })}
      </select>
    </>
  )
}
export default FormRowSelect
