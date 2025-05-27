import clsx from "clsx";
import { createElement } from "react";

type BoundedProps<T extends React.ElementType = 'section'> = {
  as?: T;
  className?: string;
  children: React.ReactNode;
} & Omit<React.ComponentPropsWithoutRef<T>, 'as' | 'className' | 'children'>;

export const Bounded = ({
  as = "section",
  className,
  children,
  ...restProps
}: BoundedProps) => {
  return createElement(
    as,
    {
      className: clsx("px-4 first:pt-10 md:px-6", className),
      ...restProps,
    },
    createElement(
      "div",
      {
        className: "mx-auto flex w-full max-w-7xl flex-col items-center",
      },
      children
    )
  );
};
