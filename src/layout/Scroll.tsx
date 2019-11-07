import React from 'react';
import { Pane, PaneProps } from 'evergreen-ui';

export type ScrollProps = Omit<PaneProps, 'overflow'>;

export function Scroll({ children, ...props }: ScrollProps) {
  return (
    <Pane overflow="auto" {...props}>
      {children}
    </Pane>
  );
}
