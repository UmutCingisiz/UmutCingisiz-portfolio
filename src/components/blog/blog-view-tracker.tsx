"use client";

import { useEffect, useState } from "react";

type Props = {
  slug: string;
  /** Sunucuda Upstash ile okunan sayı yoksa null */
  serverCount: number | null;
};

export function BlogViewTracker({ slug, serverCount }: Props) {
  const [count, setCount] = useState<number | null>(serverCount);
  /** Post denendi, Redis yapılmamış — sayı tutulmuyor */
  const [kvUnavailable, setKvUnavailable] = useState(false);

  useEffect(() => {
    // Redis ortam değişkenleri eksikse hiç yorma
    if (serverCount === null) {
      return;
    }

    const key = `blog_view_sent:${slug}`;
    // Bu oturumda zaten sayıldıysa tekrar API'yi meşgul etme
    if (typeof window !== "undefined" && sessionStorage.getItem(key)) {
      return;
    }

    let cancelled = false;

    void fetch(`/api/views/${encodeURIComponent(slug)}`, {
      method: "POST",
    })
      .then(async (res) => {
        if (cancelled) return;

        if (res.status === 503) {
          setKvUnavailable(true);
          sessionStorage.removeItem(key);
          return;
        }
        if (!res.ok) return;

        const body = (await res.json()) as { count?: number };
        if (typeof body.count === "number") {
          setCount(body.count);
          sessionStorage.setItem(key, "1");
        }
      })
      .catch(() => {
        if (!cancelled) {
          setKvUnavailable(true);
        }
      });

    // Cleanup function: Bileşen unmount olursa fetch state'ini güncelleme
    return () => {
      cancelled = true;
    };
  }, [slug, serverCount]);

  if (serverCount === null) {
    return (
      <p className="text-[0.80rem] font-mono text-amber-500/80">
        Goruntulenme sayaci su anda devre disi.
      </p>
    );
  }

  if (kvUnavailable) {
    return (
      <p className="text-[0.80rem] font-mono text-red-400/80">
        Sayaç bağlantısı kurulamadı.
      </p>
    );
  }

  const n = count ?? serverCount ?? 0;
  
  // Başarılı Senaryo: Premium UI ile sayacı göster
  return (
    <div className="flex items-center gap-1.5 text-sm font-mono text-muted-foreground">
      <span
        className="transition-opacity duration-300 opacity-100"
        title="Guncel goruntulenme"
      >
        {n.toLocaleString("tr-TR")}
      </span>
      <span>görüntülenme</span>
    </div>
  );
}