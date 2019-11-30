import React from 'react';
import { Link as EvergreenLink, LinkProps } from 'evergreen-ui';

export function Link({ children, ...props }: Omit<LinkProps, 'target'>) {
  return (
    <EvergreenLink {...props} target="_blank">
      {children}
    </EvergreenLink>
  );
}
