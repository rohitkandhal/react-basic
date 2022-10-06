// https://web.archive.org/web/20180324022838/http://demo.nimius.net/debounce_throttle/

function debounce(callback, wait) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => callback.apply(this, args), wait);
  }
}


function advancedDebounce(callback, wait, config = { leading: false, trailing: true }) {
  let timer = null;
  let lastArgs = null;

  return function debounced(...args) {
    // if timer is over and leading is true then immediately call function
    if (!timer && config.leading) {
      callback.apply(this, args);
    } else {
      lastArgs = args;
    }

    // clear timer so that next call is exactly after wait time
    clearTimeout(timer);

    timer = setTimeout(() => {
      if (config.trailing && lastArgs) {
        callback.apply(this, lastArgs);
      }

      lastArgs = null;
      timer = null;
    }, wait);
  }
}