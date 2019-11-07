import React from 'react';
import { Pane, Card, PaneProps } from 'evergreen-ui';

export type RowProps = Omit<
  PaneProps,
  'display' | 'flexDirection' | 'width'
> & {
  card?: boolean;
  grow?: boolean;
};

export function Row({ children, card, grow, ...props }: RowProps) {
  return card ? (
    <Card
      display="flex"
      flexDirection="row"
      width="100%"
      minHeight="0"
      flexGrow={grow ? 1 : 0}
      {...props}
    >
      {children}
    </Card>
  ) : (
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
