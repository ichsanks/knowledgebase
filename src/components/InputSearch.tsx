import { FaSearch } from "react-icons/fa";

interface Props extends React.HTMLAttributes<HTMLInputElement> {
  size?: "xs" | "sm" | "md" | "lg";
  name: string;
}

export function InputSearch(props: Props) {
  const inputProps = {
    ...props,
    size: undefined,
  };

  return (
    <div className="form-search">
      <input type="text" className="form-search-input" {...inputProps} />
      <div className="form-search-icon">
        <FaSearch />
      </div>
    </div>
  );
}
