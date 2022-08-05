// Theory:

// The function will be executed only after the specified time once the user stops the event call.

// In practice:

// We need to handle the scrolling of the page and execute the fn function that works with the coordinates of the scroll. Debounce will call the fn after N ms, if no more event is triggered after the timer starts. If a new event were triggered and the timer is not ended then the previous timer canceled and a new one started.

// It will work like this:

// 1. When onscroll is called for the first time, the decorated function starts a timer with a call to fn.

// 2. If we continue to scroll the page, then the previous timer is canceled and a new one starts.

// 3. If no onscroll events occur at the specified time N ms then the fn function is executed with the context and arguments of the last event.

// Solution:


// The debounce function takes 2 arguments: the function to be executed and the timeout.

// On lines 8–10, we need to save our timer, which we create for the trigger of function calls when the time expires, and we need to save the calling context and arguments so that when the timer runs out, we can execute the function with the correct context and parameters.

// Line 12 returns the function because we need to make a closure and decorate the original function in debounce.

// ​​const debounce = debounce(func, 3)

// The function that will run when the time expires is line 16. We call the original fn function with the saved context and arguments of the last call and set them to null.

// With each subsequent call, we should cancel the timer and restart it, in line 23 cancellation is implemented.

// Line 25 starts the timer by calling our fnCall function after the specified wait time.