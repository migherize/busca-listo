import { Card, CardContent } from "@/components/ui/card";

export function LoadingState() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: 8 }).map((_, i) => (
        <Card key={i} className="bg-white rounded-lg shadow-sm border border-slate-200">
          <CardContent className="p-4 animate-pulse">
            <div className="bg-slate-200 h-48 rounded-lg mb-4"></div>
            <div className="space-y-3">
              <div className="bg-slate-200 h-4 rounded w-3/4"></div>
              <div className="bg-slate-200 h-3 rounded w-1/2"></div>
              <div className="bg-slate-200 h-5 rounded w-1/3"></div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
