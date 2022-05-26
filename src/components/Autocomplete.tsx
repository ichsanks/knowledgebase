import {
  useEffect,
  useRef,
  useState,
  HTMLAttributes,
  ChangeEvent,
} from "react";
import axios from "axios";

type Selection = {
  id: string;
  title: string;
  subtitle?: string;
};

interface Props extends HTMLAttributes<HTMLInputElement> {
  source: string | any[];
  label: string;
  name: string;
  exclude: Selection[];
  value: Selection[];
  placeholder?: string;
  onChange?: any;
  [x: string]: any;
}

const axiosRequest = axios.create({
  headers: { "Access-Control-Allow-Origin": "*" },
});

export function Autocomplete(props: Props) {
  const { source, name, exclude, value } = props;
  let { label, placeholder } = props;

  const { onChange = () => console.log("onChange props required") } = props;
  const [suggestion, setSuggestion] = useState<Selection[] | null>(null);
  const [selected, setSelected] = useState<Selection[]>(value);
  const [text, setText] = useState<string>("");
  const [focused, setFocused] = useState<boolean>(false);
  const [width, setWidth] = useState<string | number>("auto");
  const ref = useRef<HTMLDivElement>(null);

  label = (!label && placeholder && placeholder) || label;
  placeholder = undefined;

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    const currExclude =
      selected.length || exclude.length
        ? [...exclude, ...selected.map((i) => i.id)]
        : [];
    setText(term);
    try {
      if (term) {
        const data = Array.isArray(source)
          ? source.filter(
              (i) =>
                i.title.toLowerCase().includes(term.toLowerCase()) &&
                !currExclude.includes(i.id)
            )
          : (
              await axiosRequest.get(source, {
                params: { term, exclude: currExclude },
              })
            ).data;
        setSuggestion(data);
      } else {
        setSuggestion(null);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleSelect = (item: Selection): void => {
    setSuggestion(null);
    setSelected([...selected, item]);
    onChange([...selected, item].map((i) => i.id));
    setText("");
    setFocused(true);
  };

  const handleRemove = (item: Selection): void => {
    const result = selected.filter((i) => item.id !== i.id);
    setSelected(result);
    onChange(result.map((i) => i.id));
    setFocused(true);
  };

  useEffect(() => {
    setWidth(ref?.current?.offsetWidth || "auto");
  }, [ref]);

  return (
    <div className="autocomplete" ref={ref}>
      <div
        className={
          focused || text
            ? "form-group focused"
            : selected.length
            ? "form-group focused no-highlight"
            : "form-group"
        }
        onClick={() => setFocused(true)}
      >
        {label && (
          <label className="form-label" htmlFor={`input-${name}`}>
            {label}
          </label>
        )}

        <div className="autocomplete-input">
          {selected &&
            selected.map((item, index) => (
              <button
                className="autocomplete-selected-item"
                key={index}
                type="button"
                onClick={() => handleRemove(item)}
              >
                {item.title}
              </button>
            ))}
          <input
            type="text"
            id={`input-${name}`}
            name={name}
            ref={(input) => input && focused && input.focus()}
            onChange={handleChange}
            onFocus={() => setFocused(true)}
            onBlur={() => !text && setFocused(false)}
            value={text}
            autoComplete="off"
          />
        </div>
      </div>
      {suggestion && (
        <Suggestion
          data={suggestion}
          width={width}
          handleSelect={handleSelect}
        />
      )}
    </div>
  );
}

type SuggestionProps = {
  data: Selection[];
  width: string | number;
  handleSelect?: any;
};

const Suggestion = ({ data, width, handleSelect }: SuggestionProps) => (
  <div className="autocomplete-suggestion" style={{ width }}>
    <ul>
      {data.map((item, index) => (
        <li key={index} onClick={() => handleSelect(item)}>
          <div>{item.title}</div>
          {item.subtitle && <div className="text-muted">{item.subtitle}</div>}
        </li>
      ))}
    </ul>
  </div>
);
