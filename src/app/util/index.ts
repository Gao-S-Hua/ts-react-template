
type IFn = () => void;
function debounceWrapper(fn: IFn, time: number): unknown {
  let timer: NodeJS.Timeout | null = null;
  return function(...arg: []): void {
    const _arg = arg;
    const _this: any = this;
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(function() { fn.apply(_this, _arg); }, time);
  }
}

export const debounce = debounceWrapper;
