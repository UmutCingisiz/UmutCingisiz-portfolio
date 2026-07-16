"use client";

type Props = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function GlobalError({ error, reset }: Props) {
  return (
    <html lang="tr">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "system-ui, sans-serif",
          background: "#09090b",
          color: "#fafaf9",
          padding: "1.5rem",
          textAlign: "center",
        }}
      >
        <p style={{ fontSize: "0.875rem", opacity: 0.7 }}>Kritik hata</p>
        <h1 style={{ marginTop: "1rem", fontSize: "1.75rem" }}>
          Uygulama yüklenemedi
        </h1>
        <p style={{ marginTop: "1rem", maxWidth: "28rem", opacity: 0.8 }}>
          {error.message || "Beklenmeyen bir sorun oluştu."}
        </p>
        <button
          type="button"
          onClick={reset}
          style={{
            marginTop: "2rem",
            padding: "0.625rem 1.25rem",
            borderRadius: "0.5rem",
            border: "none",
            background: "#fafaf9",
            color: "#09090b",
            fontWeight: 500,
            cursor: "pointer",
          }}
        >
          Tekrar dene
        </button>
      </body>
    </html>
  );
}
