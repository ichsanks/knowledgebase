import { ThreeDots } from "react-loader-spinner";

interface Props extends React.HTMLAttributes<HTMLButtonElement> {
  size?: "xs" | "sm" | "md" | "lg";
  variant?: "default" | "primary" | "secondary" | "transparent";
  block?: boolean;
  loading?: boolean;
  [x: string]: any;
}

export function Button(props: Props) {
  const {
    size = "md",
    variant = "default",
    block = false,
    loading = false,
    children,
  } = props;

  const disabled = props.disabled || loading;

  return (
    <button
      className={`btn btn--${size} btn--${variant} ${
        block ? "btn--block" : ""
      }`}
      {...props}
      disabled={disabled}
    >
      {loading ? <ThreeDots color="white" height={24} width={24} /> : children}
    </button>
  );
}
