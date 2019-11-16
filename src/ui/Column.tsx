import { Card, Pane, PaneProps } from 'evergreen-ui';
import React from 'react';

export type ColumnProps = Omit<
  PaneProps,
  'display' | 'flexDirection' | 'minWidth' | 'height'
> & {
  card?: boolean;
  grow?: boolean;
};

export function Column({ children, card, grow, ...props }: ColumnProps) {
  return card ? (
    <Card
      display="flex"
      flexDirection="column"
      minWidth="0"
      height="100%"
      flexGrow={grow ? 1 : 0}
      {...props}
    >
      {children}
    </Card>
  ) : (
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
