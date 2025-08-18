import { useEffect } from "react";
import type { AdBannerProps } from "@shared/schema";

export const AdBannerVertical: React.FC<AdBannerProps> = ({ adSlot }) => {
  useEffect(() => {
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error("Adsense error", e);
    }
  }, []);

  return (
    <ins
      className="adsbygoogle"
      style={{ display: "block", width: "160px", height: "600px" }}
      data-ad-client="ca-pub-3423868416890847"
      data-ad-slot={adSlot}
      data-ad-format="auto"
      data-full-width-responsive="false"
    ></ins>
  );
};
