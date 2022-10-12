// Throttle allows you to execute the function only once in a given time interval.
// In practice:
// For example, we need to handle the scrolling of the page and execute some fn function that works with the coordinates of the scroll. We can subscribe directly to the onscroll event, but it will be called very often (depending on how fast we scroll), but even if we do it quickly, events will be more than 1–2. You can decorate the executed function in throttle and execute it once every N ms.
// https://web.archive.org/web/20180324022838/http://demo.nimius.net/debounce_throttle/

function throttle(callback, wait) {
  let isWaiting = false, lastArgs = null;

  return function (...args) {
    if (isWaiting) {
      lastArgs = args;
    } else {
      callback.apply(this, args);
      isWaiting = true;

      // Reusable timeout function
      let timeout = () => setTimeout(() => {
        isWaiting = false;

        // Another function waiting, restart the wait
        if (lastArgs) {
          callback.apply(this, lastArgs);
          isWaiting = true;
          lastArgs = null;

          // wait for another one
          timeout();
        }
      }, wait);

      timeout();
    }
  }
}

// throttle() which accepts third parameter, option: {leading: boolean, trailing: boolean}
// leading - true - then first method is called right away, else not called
// trailing - true - then last method is called
// if both are false then nothing happens
function advancedThrottle(callback, wait, config = { leading: true, trailing: true }) {
  let isWaiting = false, lastArgs = null;
  return function (...args) {
    if (isWaiting) {
      // Add last args only if trailing is set
      if (config.trailing) {
        lastArgs = args;
      }
    } else {
      // Not waiting
      if (config.leading) {
        callback.apply(this, args);
      } else {
        // leading is not enabled. Add args to lastArgs
        lastArgs = args;
      }

      isWaiting = true;
      let timeout = () => setTimeout(() => {
        // waiting period over. If trailing is enabled then run last args
        isWaiting = false;

        if (config.trailing) {
          if (lastArgs) {
            callback.apply(this, lastArgs);
            isWaiting = true;

            timeout();
          }
        }
        lastArgs = null;
      }, wait);

      timeout();
    }
  }
}

