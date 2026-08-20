"use client";

import dynamic from "next/dynamic";

/**
 * TBT için kaput-altı lazy adalar.
 * `ssr: false` yalnızca Client Component içinde geçerli — layout/page RSC kalır.
 * Görsel tasarım / animasyon API’sine dokunulmaz; sadece yükleme zamanı kayar.
 */

export const DeferredHiddenTerminal = dynamic(
  () =>
    import("@/components/hidden-terminal").then((m) => m.HiddenTerminal),
  { ssr: false },
);

export const DeferredNetworkStatus = dynamic(
  () =>
    import("@/components/network-status").then((m) => m.NetworkStatus),
  { ssr: false },
);

export const DeferredTerminalPrompt = dynamic(
  () =>
    import("@/components/terminal-prompt").then((m) => m.TerminalPrompt),
  // SSR açık: ssr:false hydratasyonda büyük dikey boşluk açıp footer CLS (~0.4) üretiyordu.
  { ssr: true },
);

export const DeferredHashScroll = dynamic(
  () => import("@/components/hash-scroll").then((m) => m.HashScroll),
  { ssr: false },
);

export const DeferredContactSuccessToast = dynamic(
  () =>
    import("@/components/contact-success-toast").then(
      (m) => m.ContactSuccessToast,
    ),
  { ssr: false },
);

export const DeferredContactForm = dynamic(
  () =>
    import("@/components/contact/contact-form").then((m) => m.ContactForm),
  // SSR açık: ssr:false form alanını boş bırakıp footer'ı itiyordu (desktop CLS ~0.26).
  { ssr: true },
);
