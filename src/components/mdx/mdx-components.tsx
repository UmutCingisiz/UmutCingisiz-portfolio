import Link from "next/link";
import type { MDXComponents } from "mdx/types";

function MdxLink(props: React.ComponentPropsWithoutRef<"a">) {
  const { href, children, ...rest } = props;
  if (!href) return <span {...rest}>{children}</span>;
  if (href.startsWith("/") || href.startsWith("#")) {
    return (
      <Link
        href={href}
        className="font-medium text-accent underline underline-offset-4"
        {...rest}
      >
        {children}
      </Link>
    );
  }
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="font-medium text-accent underline underline-offset-4"
      {...rest}
    >
      {children}
    </a>
  );
}

export const mdxComponents: MDXComponents = {
  a: MdxLink,
};
