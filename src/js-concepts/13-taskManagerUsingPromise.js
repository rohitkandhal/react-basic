// Running Tasks in Sequence
// Implement a function runTask which receives a task to run. For this exercise, each task is a function that returns a setTimeout callback. Tasks should only begin if there are no tasks currently running.
// Sigma 07/25/22
// Part 1 - you will pass only one task at a time
// Part 2 - you can pass multiple tasks at a time

class TaskManager {
  queue;
  isTaskInProgress;

  constructor() {
    this.isTaskInProgress = false;
    this.queue = [];
  }

  // Ensures that all task run in sequence
  runTask = (task) => {

    // If no task is running, then create new promise and start task
    if (!this.isTaskInProgress) {
      const taskPromise = new Promise((resolve, reject) => {
        // Set task in progress so that all new tasks are added to queue
        this.isTaskInProgress = true;

        // Pass resolve function to task so that when 
        // task is done, then resolve is called. Unless resolve is called
        // all new tasks are added to queue
        task(resolve)
      });

      taskPromise.then(() => {
        this.isTaskInProgress = false;

        if (this.queue.length > 0) {
          const nextTask = this.queue.shift();
          this.runTask(nextTask);
        }
      })
    } else {
      this.queue.push(task)
    }
  }

  runTasks = (tasks) => {
    // Parallelize all tasks that are sent in batch so that
    // [a,b] -> will run till the longest task , [c] then next set is picked up

    if (this.isTaskInProgress) {
      this.queue.push(tasks);
    } else {
      const allTaskPromises = tasks.map(task => new Promise((resolve, reject) => {
        this.isTaskInProgress = true;
        task(resolve);
      }));
      Promise.all(allTaskPromises).then(() => {
        this.isTaskInProgress = false;

        if (this.queue.length > 0) {
          const nextSetOfTasks = this.queue.shift();
          this.runTasks(nextSetOfTasks);
        }
      })
    }
  }
}

// Test Case:
const manager = new TaskManager();
// manager.runTask(b); // "b" takes 200 ms to run this API
// manager.runTask(a); // "a" takes 300 ms to run this API
// manager.runTask(c); // "c" takes 150 ms to run this API
// Expected output:
// b a c
// Without our work it  will be c b a

manager.runTasks([a, b, b]); // "b" takes 200 ms to run this API, // "a" takes 300 ms to run this API
manager.runTasks([c]); // "c" takes 150 ms to run this API
// Expected - b, a, c

// Test tasks
function a(done) {
  setTimeout(function () {
    console.log('a - 300');
    done();
  }, 300);
}

function b(done) {
  setTimeout(function () {
    console.log('b - 200');
    done();
  }, 200);
}

function c(done) {
  setTimeout(function () {
    console.log('c - 150');
    done();
  }, 150);
}
