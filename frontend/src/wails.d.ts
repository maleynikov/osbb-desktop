export {};

declare global {
  interface Window {
    runtime: {
      WindowPrint: () => void;
    };
  }
}