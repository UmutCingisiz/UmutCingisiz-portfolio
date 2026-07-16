import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site-config";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

function initials() {
  return siteConfig.name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#09090b",
          color: "#fafaf9",
          fontSize: 14,
          fontWeight: 700,
          fontFamily: "sans-serif",
        }}
      >
        {initials()}
      </div>
    ),
    size,
  );
}
