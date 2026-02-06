import { useUrlParams } from "../hooks/useUrlParams";

function FilterSelect({ paramName, options, defaultLabel = "All" }) {
  const { getParam, setParam } = useUrlParams();

  const currentValue = getParam(paramName);

  function handleChange(e) {
    setParam(paramName, e.target.value);
  }

  return (
    <select value={currentValue} onChange={handleChange} className="input w-40">
      <option value="">{defaultLabel}</option>

      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

export default FilterSelect;
