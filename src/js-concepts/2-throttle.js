// Theory:
// Throttle allows you to execute the function only once in a given time interval.

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






// In practice:
// For example, we need to handle the scrolling of the page and execute some fn function that works with the coordinates of the scroll. We can subscribe directly to the onscroll event, but it will be called very often (depending on how fast we scroll), but even if we do it quickly, events will be more than 1–2. You can decorate the executed function in throttle and execute it once every N ms.

// It will work like this:
// 1. The first time onscroll is called, the decorated variant passes the call to fn immediately. The user sees the changes.
// 2. If we keep scrolling the page, then nothing happens N ms. Onscroll events are ignored.
// 3. When the scroll stops, the decorated function will wait until N ms has passed and execute fn with the last coordinates. It will process the final coordinates where the scroll stopped.

// Solution:


// Let’s analyze the solution:

// The throttle function takes 2 arguments: the function to be executed and the timeout in ms.
// In lines 7–9, we need to save our timer, which we create for the trigger of function calls at a given interval, and we need to save the calling context and arguments so that when the timer runs out, we can execute the function with the correct context and parameters.

// Line 11 returns the function because we need to make a closure and decorate the original function in the throttle.

// ​​const throttled = throttle(func, 3)

// Now we should process 2 options: the first call and subsequent ones. The first call should work immediately, without waiting for the timer to expire. Subsequent ones should be “overwritten” and the most recent ones should be called when the timer expires.

// Checking is the first call or not is performed according to the running timer, so in line 12 you can see it, if this is not the first call, we just save the context and arguments.

// If this is the first call, then the function is immediately executed (line 16) and the timer (line 18) is started with the specified time interval. An additional check for arguments inside the timer is so that if we had only one call (we did the first one right away) so that it would not be called again after the time expired. If there were calls then after the time has passed the function will be called with the saved context and arguments (line 20), the timer is cleared (line 22), the data of the last call is also cleared (lines 23, 24).