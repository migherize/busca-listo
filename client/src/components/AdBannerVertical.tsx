import { useEffect } from "react";

export const AdBannerVertical = () => {
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
            style={{ display: "block" }}
            data-ad-client="ca-pub-3423868416890847"
            data-ad-slot="8365869664"
            data-ad-format="auto"
            data-full-width-responsive="true"
        ></ins>
    );
};
