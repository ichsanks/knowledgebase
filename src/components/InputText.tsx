import { useState } from "react";

interface Props extends React.HTMLAttributes<HTMLInputElement> {
  size?: "xs" | "sm" | "md" | "lg";
  label?: string;
  name: string;
  onChange?: any;
  [x: string]: any;
}

export function InputText(props: Props) {
  const { size = "md", name, type, onChange, value } = props;
  let { label, placeholder } = props;
  label = (!label && placeholder && placeholder) || label;
  placeholder = undefined;

  const [focused, setFocused] = useState<boolean>(false);

  const handleFocus = () => {
    setFocused(true);
  };

  const inputProps = {
    ...props,
    size: undefined,
    type,
    name,
    onChange,
    onFocus: handleFocus,
    onBlur: () => !value && setFocused(false),
    id: `input-${name}`,
    className:
      type === "number"
        ? `form-input--${size} text-right`
        : `form-input--${size}`,
    ...(type !== "file" && { value }),
  };

  return (
    <div
      className={`${focused || value ? "form-group focused" : "form-group"}`}
    >
      {label && (
        <label className="form-label" htmlFor={`input-${name}`}>
          {label}
        </label>
      )}
      <input {...inputProps} />
    </div>
  );
}
