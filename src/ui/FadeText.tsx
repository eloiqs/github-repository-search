import React from 'react';
import { Text, TextProps, Pane } from 'evergreen-ui';

export type FadeTextProps = TextProps;

export function FadeText({ children, ...props }: FadeTextProps) {
  return (
    <Pane
      className="fade-text"
      position="relative"
      height="100%"
      overflow="hidden"
    >
      <Text {...props}>{children}</Text>
    </Pane>
  );
}
