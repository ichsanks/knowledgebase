import React from "react";

interface Props extends React.HTMLAttributes<HTMLSelectElement> {
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  data: any[];
  [x: string]: any;
}

export function Select(props: Props) {
  const { name, data, size = "md" } = props;
  let { label, placeholder } = props;
  label = (!label && placeholder && placeholder) || label;
  placeholder = undefined;

  const selectProps = {
    ...props,
    size: undefined,
  };

  return (
    <div className="form-group focused">
      {label && (
        <label className="form-label" htmlFor={`select-${name}`}>
          {label}
        </label>
      )}
      <select id={`select-${name}`} className="form-input" {...selectProps}>
        {data.map((item, index) => {
          return (
            <option key={index} value={item.id}>
              {item.title}
            </option>
          );
        })}
      </select>
    </div>
  );
}
