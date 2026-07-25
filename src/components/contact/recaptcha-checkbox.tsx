"use client";

import {
  forwardRef,
  useEffect,
  useRef,
  useState,
  type ComponentRef,
} from "react";
import ReCAPTCHA from "react-google-recaptcha";

const WIDGET_WIDTH = 304;
const WIDGET_HEIGHT = 78;

type Props = {
  sitekey: string;
  onChange: (token: string | null) => void;
  onExpired: () => void;
  onErrored: () => void;
};

/**
 * reCAPTCHA v2 checkbox — dar ekranlarda 304px widget'ı container'a sığdırır.
 * (overflow-hidden parent'lar aksi halde kutuyu tamamen keser.)
 */
export const RecaptchaCheckbox = forwardRef<ComponentRef<typeof ReCAPTCHA>, Props>(
  function RecaptchaCheckbox({ sitekey, onChange, onExpired, onErrored }, ref) {
    const hostRef = useRef<HTMLDivElement>(null);
    const [scale, setScale] = useState(1);

    useEffect(() => {
      const host = hostRef.current;
      if (!host) return;

      const update = () => {
        const width = host.clientWidth;
        if (width <= 0) return;
        setScale(Math.min(1, width / WIDGET_WIDTH));
      };

      update();
      const ro = new ResizeObserver(update);
      ro.observe(host);
      return () => ro.disconnect();
    }, []);

    return (
      <div
        ref={hostRef}
        className="w-full max-w-full"
        style={{ height: WIDGET_HEIGHT * scale }}
      >
        <div
          className="origin-top-left"
          style={{
            width: WIDGET_WIDTH,
            height: WIDGET_HEIGHT,
            transform: `scale(${scale})`,
          }}
        >
          <ReCAPTCHA
            ref={ref}
            sitekey={sitekey}
            theme="dark"
            hl="tr"
            onChange={onChange}
            onExpired={onExpired}
            onErrored={onErrored}
          />
        </div>
      </div>
    );
  },
);
