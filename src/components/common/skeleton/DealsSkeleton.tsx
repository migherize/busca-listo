import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

interface DealsSkeletonProps {
  count?: number;
  className?: string;
}

export function DealsSkeleton({ 
  count = 6, 
  className = ''
}: DealsSkeletonProps) {
  return (
    <div className={`flex gap-4 overflow-x-auto pb-2 ${className}`}>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="min-w-[260px] max-w-[260px]">
          <div className="space-y-3">
            <Skeleton height={200} className="rounded-lg" />
            <div className="space-y-2">
              <Skeleton height={16} width="90%" />
              <Skeleton height={14} width="70%" />
              <div className="flex gap-2">
                <Skeleton height={18} width="40%" />
                <Skeleton height={18} width="30%" />
              </div>
              <Skeleton height={32} width="100%" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
