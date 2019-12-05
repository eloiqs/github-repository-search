import { fireEvent } from '@testing-library/react';

type DocumentDimensions = {
  width: number;
  height: number;
};

type DocumentPosition = {
  x: number;
  y: number;
};

export function setupScrollMock(
  documentDimensions: Partial<DocumentDimensions>,
  initialPosition?: Partial<DocumentPosition> | undefined
) {
  let defaultPosition = {
    x: (window as any).pageXOffset,
    y: (window as any).pageYOffset
  };

  let defaultDimensions = {
    width: document.documentElement.offsetWidth,
    height: document.documentElement.offsetHeight
  };

  let offsetWidth = documentDimensions.width || defaultDimensions.width;
  let offsetHeight = documentDimensions.height || defaultDimensions.height;

  const defaultOffsetHeightDescriptor = Object.getOwnPropertyDescriptor(
    document.documentElement,
    'offsetHeight'
  );
  const defaultOffsetWidthDescriptor = Object.getOwnPropertyDescriptor(
    document.documentElement,
    'offsetWidth'
  );

  Object.defineProperty(document.documentElement, 'offsetHeight', {
    configurable: true,
    get: () => offsetHeight
  });

  Object.defineProperty(document.documentElement, 'offsetWidth', {
    configurable: true,
    get: () => offsetWidth
  });

  let posX = (initialPosition && initialPosition.x) || defaultPosition.x;
  let posY = (initialPosition && initialPosition.y) || defaultPosition.y;

  mockDocumentPosition({ x: posX, y: posY });

  function scrollTo({ x, y }: Partial<DocumentPosition>) {
    posX = x || posX;
    posY = y || posY;
    mockDocumentPosition({ x: posX, y: posY });
    fireEvent.scroll(window);
  }

  function updateDocumentDimensions({
    width,
    height
  }: Partial<DocumentDimensions>) {
    offsetWidth = width || offsetWidth;
    offsetHeight = height || offsetWidth;
  }

  function cleanup() {
    mockDocumentPosition({ x: defaultPosition.x, y: defaultPosition.y });
    updateDocumentDimensions({
      width: defaultDimensions.width,
      height: defaultDimensions.height
    });

    if (defaultOffsetHeightDescriptor) {
      Object.defineProperty(
        document.documentElement,
        'offsetHeight',
        defaultOffsetHeightDescriptor
      );
    }

    if (defaultOffsetWidthDescriptor) {
      Object.defineProperty(
        document.documentElement,
        'offsetWidth',
        defaultOffsetWidthDescriptor
      );
    }
  }

  return { scrollTo, updateDocumentDimensions, cleanup };
}

function mockDocumentPosition({ x, y }: DocumentPosition) {
  (window as any).pageXOffset = x;
  (window as any).pageYOffset = y;
}
