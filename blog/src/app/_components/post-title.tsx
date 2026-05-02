import { ReactNode } from "react";

type Props = {
  children?: ReactNode;
};

export function PostTitle({ children }: Props) {
  return (
    <h1 className="font-serif text-display font-semibold tracking-tighter leading-[1.05] text-foreground">
      {children}
    </h1>
  );
}
