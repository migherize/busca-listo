import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export interface PopularCategoryCardProps {
  name: string;
  imageUrl: string;
  onClick: () => void;
}

export function PopularCategoryCard({ name, imageUrl, onClick }: PopularCategoryCardProps) {
  return (
    <Card className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow duration-200">
      <div className="h-28 w-full overflow-hidden">
        <img src={imageUrl} alt={name} className="w-full h-full object-cover" />
      </div>
      <CardContent className="p-4 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-slate-900 line-clamp-1">{name}</h3>
        <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white" onClick={onClick}>
          Ver categoría
        </Button>
      </CardContent>
    </Card>
  );
}

