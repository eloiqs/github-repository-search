import React from 'react';
import { Pane } from './Pane';
import { Text, TextProps } from './Text';

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
