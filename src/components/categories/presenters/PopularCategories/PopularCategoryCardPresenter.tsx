import { Card, CardContent } from "@/components/common/ui/card";
import { Link } from "wouter";

interface PopularCategoryCardProps {
  name: string;
  categoryKey: string;
  imageUrl?: string;
}

export function PopularCategoryCard({ name, categoryKey, imageUrl }: PopularCategoryCardProps) {
  return (
    <Link href={`/category/${categoryKey}`} className="block">
      <Card className="bg-white rounded-lg shadow-sm border border-slate-200 hover:shadow-md transition-shadow duration-200 cursor-pointer">
        <img
          src={imageUrl ?? "/assets/defaultcategory.jpeg"}
          alt={name}
          className="w-full h-32 object-cover rounded-t-lg"
        />
        <CardContent className="p-2 text-center">
          <h3 className="text-sm font-semibold text-slate-900 line-clamp-2">{name}</h3>
        </CardContent>
      </Card>
    </Link>
  );
}
