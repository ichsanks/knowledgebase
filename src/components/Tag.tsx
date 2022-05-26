import { ReactNode } from "react";

type Props = {
  variant: "default" | "primary";
  children: ReactNode;
};

export function Tag(props: Props) {
  const { variant = "default", children } = props;
  return <div className={`tag tag--${variant}`}>{children}</div>;
}
