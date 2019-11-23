import React from 'react';
import { Pane, PaneProps } from './Pane';

export type ColumnProps = Omit<
  PaneProps,
  'display' | 'flexDirection' | 'minWidth' | 'height'
> & {
  grow?: boolean;
};

export function Column({ children, card, grow, ...props }: ColumnProps) {
  return (
    <Pane
      display="flex"
      flexDirection="column"
      minWidth="0"
      height="100%"
      flexGrow={grow ? 1 : 0}
      {...props}
    >
      {children}
    </Pane>
  );
}
