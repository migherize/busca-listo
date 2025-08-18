import { useEffect, useState } from "react";
import type { Ad } from "@shared/schema";

export const CustomAdsLeft = () => {
  const [ads, setAds] = useState<Ad[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/data/ads-left.json")
      .then(res => {
        if (!res.ok) throw new Error("No se pudo cargar el JSON");
        return res.json();
      })
      .then((data: Ad[]) => {
        setAds(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError("Error al cargar anuncios");
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Cargando anuncios...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="space-y-4">
      {ads.map(ad => (
        <a key={ad.id} href={ad.link} className="block">
          <img src={ad.imageUrl} alt={ad.title} className="w-full rounded-lg mb-2" />
        </a>
      ))}
    </div>
  );
};
