import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

interface CategorySkeletonProps {
  count?: number;
  className?: string;
  variant?: 'grid' | 'list';
}

export function CategorySkeleton({ 
  count = 6, 
  className = '',
  variant = 'grid'
}: CategorySkeletonProps) {
  const renderSkeleton = () => {
    if (variant === 'list') {
      return (
        <div className="flex items-center gap-3 p-3 border rounded-lg">
          <Skeleton width={60} height={60} className="rounded-full" />
          <div className="flex-1">
            <Skeleton height={18} width="70%" />
            <Skeleton height={14} width="50%" />
          </div>
        </div>
      );
    }

    // Default grid variant
    return (
      <div className="text-center space-y-3">
        <Skeleton width={80} height={80} className="rounded-full mx-auto" />
        <Skeleton height={16} width="80%" className="mx-auto" />
        <Skeleton height={12} width="60%" className="mx-auto" />
      </div>
    );
  };

  return (
    <div className={className}>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index}>
          {renderSkeleton()}
        </div>
      ))}
    </div>
  );
}
