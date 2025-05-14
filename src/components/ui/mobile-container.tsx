
import React from 'react';
import { cn } from '@/lib/utils';
import { useMediaQuery } from '@/hooks/use-mobile';

interface MobileContainerProps {
  children: React.ReactNode;
  className?: string;
  fullHeight?: boolean;
}

export function MobileContainer({ 
  children, 
  className,
  fullHeight = false
}: MobileContainerProps) {
  const isMobile = useMediaQuery('(max-width: 768px)');
  
  return (
    <div className={cn(
      "w-full mx-auto px-4 sm:px-6",
      fullHeight ? 'min-h-[calc(100vh-4rem)]' : '',
      isMobile ? 'max-w-full' : 'max-w-7xl',
      className
    )}>
      {children}
    </div>
  );
}

export default MobileContainer;
