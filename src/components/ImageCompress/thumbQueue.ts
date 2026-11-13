/** 限制缩略图解码并发，避免和压缩抢主线程 / 内存带宽 */
const MAX_THUMB_CONCURRENT = 2;

let active = 0;
const waiting: Array<() => void> = [];

function pump() {
  while (active < MAX_THUMB_CONCURRENT && waiting.length > 0) {
    const next = waiting.shift();
    next?.();
  }
}

export function runThumbTask<T>(task: () => Promise<T>): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const start = () => {
      active += 1;
      task()
        .then(resolve, reject)
        .finally(() => {
          active -= 1;
          pump();
        });
    };

    if (active < MAX_THUMB_CONCURRENT) {
      start();
    } else {
      waiting.push(start);
    }
  });
}
