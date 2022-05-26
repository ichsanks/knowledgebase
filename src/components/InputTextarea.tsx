import { useState, ChangeEvent } from "react";
import TextareaAutosize from "react-textarea-autosize";

interface Props extends TextareaAutosize {
  size: "xs" | "sm" | "md" | "lg";
  label: string;
  name: string;
  onChange?: any;
  [x: string]: any;
}

export function InputTextarea(props: Props) {
  const { size = "md", name, maxRows = 4, onChange } = props;
  let { label, placeholder } = props;
  label = (!label && placeholder && placeholder) || label;
  placeholder = undefined;

  const [focused, setFocused] = useState<boolean>(false);
  const [value, setValue] = useState<string>(props.value);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
    onChange(e.target.value);
  };

  const textAreaProps = {
    ...props,
    size: undefined,
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
      <TextareaAutosize
        id={`input-${name}`}
        className={`form-input--${size}`}
        {...textAreaProps}
        rows={1}
        maxRows={maxRows}
        onChange={handleChange}
        onFocus={() => setFocused(true)}
        onBlur={() => !value && setFocused(false)}
        value={value}
      />
    </div>
  );
}
