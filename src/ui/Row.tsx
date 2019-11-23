import React from 'react';
import { Pane, PaneProps } from './Pane';

export type RowProps = Omit<
  PaneProps,
  'display' | 'flexDirection' | 'width'
> & {
  grow?: boolean;
};

export function Row({ children, card, grow, ...props }: RowProps) {
  return (
    <Pane
      display="flex"
      flexDirection="row"
      width="100%"
      minHeight="0"
      flexGrow={grow ? 1 : 0}
      {...props}
    >
      {children}
    </Pane>
  );
}
