export function debounce(func: Function, timeout: number) {
  let timer: any = null;
  return function (...args: Array<unknown>) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      func(...args);
    }, timeout);
  };
}
