import clsx from "clsx";
import React from "react";

interface BoundedProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: "section" | "div" | "article" | "main" | "header" | "footer";
}

const Bounded = React.forwardRef<HTMLDivElement, BoundedProps>(
  ({ as: Component = "section", className, children, ...props }, ref) => {
    return (
      <Component
        ref={ref as any}
        className={clsx("px-4 first:pt-10 md:px-6", className)}
        {...props}
      >
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center">
          {children}
        </div>
      </Component>
    );
  }
);

Bounded.displayName = "Bounded";

export { Bounded };
export default Bounded;