export function mockRaf() {
  let defaultRaf = window.requestAnimationFrame;
  let defaultCaf = window.cancelAnimationFrame;

  window.requestAnimationFrame = cb => setTimeout(cb, 16) as any;
  window.cancelAnimationFrame = id => clearTimeout(id);

  function cleanup() {
    window.requestAnimationFrame = defaultRaf;
    window.cancelAnimationFrame = defaultCaf;
  }

  return { cleanup };
}
