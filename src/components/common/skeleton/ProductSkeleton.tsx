import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

interface ProductSkeletonProps {
  count?: number;
  className?: string;
  showImage?: boolean;
  showPrice?: boolean;
  showButton?: boolean;
  variant?: 'card' | 'list' | 'grid';
}

export function ProductSkeleton({ 
  count = 1, 
  className = '',
  showImage = true,
  showPrice = true,
  showButton = true,
  variant = 'card'
}: ProductSkeletonProps) {
  const renderSkeleton = () => {
    if (variant === 'list') {
      return (
        <div className="flex gap-4 p-4 border rounded-lg">
          {showImage && (
            <Skeleton width={80} height={80} className="rounded" />
          )}
          <div className="flex-1 space-y-2">
            <Skeleton height={20} width="80%" />
            <Skeleton height={16} width="60%" />
            {showPrice && <Skeleton height={18} width="40%" />}
            {showButton && <Skeleton height={32} width={100} />}
          </div>
        </div>
      );
    }

    if (variant === 'grid') {
      return (
        <div className="space-y-3">
          {showImage && (
            <Skeleton height={200} className="rounded-lg" />
          )}
          <div className="space-y-2">
            <Skeleton height={18} width="90%" />
            <Skeleton height={16} width="70%" />
            {showPrice && <Skeleton height={20} width="50%" />}
            {showButton && <Skeleton height={32} width="100%" />}
          </div>
        </div>
      );
    }

    // Default card variant
    return (
      <div className="space-y-3">
        {showImage && (
          <Skeleton height={160} className="rounded-lg" />
        )}
        <div className="space-y-2">
          <Skeleton height={16} width="85%" />
          <Skeleton height={14} width="65%" />
          {showPrice && <Skeleton height={18} width="45%" />}
          {showButton && <Skeleton height={32} width="100%" />}
        </div>
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
