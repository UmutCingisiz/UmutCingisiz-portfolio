type Props = {
  data: Record<string, unknown>;
};

/** Safe JSON-LD script — escapes `<` so payload cannot break out of the script tag. */
export function JsonLd({ data }: Props) {
  const json = JSON.stringify(data).replace(/</g, "\\u003c");
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
