import * as React from 'react';
import { Loader2Icon } from 'lucide-react';

import { cn } from '#/shared/lib/utils';

function Spinner({ className, height, width, ...props }: React.ComponentProps<'svg'>) {
  const hasExplicitDimensions = height !== undefined || width !== undefined;
  const mergedClassName = cn(hasExplicitDimensions ? undefined : 'size-4', 'animate-spin', className);
  return <Loader2Icon role="status" aria-label="Loading" className={mergedClassName} height={height} width={width} {...props} />;
}

export { Spinner };
