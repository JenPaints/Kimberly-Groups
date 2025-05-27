import clsx from "clsx";
import Image from "next/image";

export function FizziLogo(props: React.HTMLAttributes<HTMLImageElement>) {
  return (
    <Image
      src="/kim.png" // Adjust path as needed
      alt="Kimberly Groups"
      width={150}
      height={170}
      className={clsx("group", props.className)}
      {...props}
    />
  );
}
