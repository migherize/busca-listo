import { Button } from "@/components/common/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { PaginationProps } from "@shared/schema";

export function Pagination({
  currentPage,
  totalPages,
  totalResults,
  resultsPerPage,
  onPageChange,
}: PaginationProps) {
  const startResult = (currentPage - 1) * resultsPerPage + 1;
  const endResult = Math.min(currentPage * resultsPerPage, totalResults);

  return (
    <div className="mt-12 flex items-center justify-between">
      <div className="flex items-center text-sm text-slate-600">
        {`Mostrando ${startResult} a ${endResult} de ${totalResults} productos`}
      </div>

      <div className="flex items-center space-x-2">
        <Button
          variant="ghost"
          size="sm"
          className="px-3 py-2 text-sm text-slate-600 hover:text-blue-600 disabled:opacity-50"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Anterior
        </Button>

        {Array.from({ length: Math.min(totalPages, 5) }).map((_, i) => {
          const page = i + 1;
          return (
            <Button
              key={page}
              variant={currentPage === page ? "default" : "ghost"}
              size="sm"
              className={
                currentPage === page
                  ? "px-3 py-2 text-sm bg-blue-600 text-white"
                  : "px-3 py-2 text-sm text-slate-600 hover:text-blue-600 hover:bg-slate-50"
              }
              onClick={() => onPageChange(page)}
            >
              {page}
            </Button>
          );
        })}

        <Button
          variant="ghost"
          size="sm"
          className="px-3 py-2 text-sm text-slate-600 hover:text-blue-600 disabled:opacity-50"
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
        >
          Siguiente
          <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </div>
    </div>
  );
}
