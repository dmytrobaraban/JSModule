const listOfTasks = [
  {
    start: 0,
    duration: 15,
    title: 'Exercise',
  },
  {
    start: 25,
    duration: 30,
    title: 'Travel to work',
  },
  {
    start: 30,
    duration: 30,
    title: 'Plan day',
  },
  {
    start: 60,
    duration: 15,
    title: "Review yesterday's commits",
  },
  {
    start: 100,
    duration: 15,
    title: 'Code review',
  },
  {
    start: 180,
    duration: 90,
    title: 'Have lunch with John',
  },
  {
    start: 360,
    duration: 30,
    title: 'Skype call',
  },
  {
    start: 370,
    duration: 45,
    title: 'Follow up with designer',
  },
  {
    start: 405,
    duration: 30,
    title: 'Push up branch',
  },
];

class RenderCalendar {
  constructor() {
    this.container = document.querySelector('.calendar-container');
    this.renderRange();
  }
  renderRange() {
    for (let i = 8; i <= 17; i++) {
      const rangeOfHour = document.createElement('div');
      rangeOfHour.className = 'hour hour-range';
      rangeOfHour.innerHTML = `
        <p class="hour hour-current">${i}:00</p>
        <p class="hour hour-half">${i}:30</p>
        `;
      if (i === 17) {
        rangeOfHour.innerHTML = `
        <p class="hour-current">${i}:00</p>
        `;
      }
      this.container.append(rangeOfHour);
    }
  }
}

class Task {
  constructor(task) {
    Object.assign(this, task);
    this.width = 200;
    this.end = task.start + task.duration;
    this.leftX = 40;
    this.id = Task.ID++;
  }
  static ID = 0;
}

class TaskList {
  constructor(list) {
    this.tasks = list.map((task) => new Task(task));
    this.setWidthAndPosition();
  }

  setWidthAndPosition() {
    this.tasks.forEach((task) => {
      for (let i = 0; i < this.tasks.length; i++) {
        if (
          (task.end > this.tasks[i].start &&
            task.start < this.tasks[i].start) ||
          (task.end > this.tasks[i].start && task.end < this.tasks[i].end)
        ) {
          task.width = 100;
          this.tasks[i].width = 100;

          // left coordinate

          if (task.leftX === this.tasks[i].leftX) {
            this.tasks[i].leftX += 100;
          }
          if (task.leftX === 140 && this.tasks[i].leftX === 40) {
            this.tasks[i].leftX += 200;
          }
        }
      }
    });
  }
}

class RenderTaskList {
  #taskList = null;
  constructor(tasksList) {
    this.eventContainer = document.querySelector('.calendar-container');
    this.#taskList = tasksList.tasks;
    this.renderTask(this.#taskList);
  }

  renderTask(listOfTasks) {
    const taskItems = listOfTasks.forEach((item) => {
      const taskContainer = document.createElement('div');
      taskContainer.className = 'task-item';
      taskContainer.innerHTML = `
          <p>${item.title}</p>`;
      taskContainer.setAttribute(
        'style',
        `height: ${item.duration * 2}px; width: ${item.width}px; top: ${
          item.start * 2
        }px; left: ${item.leftX}px;`
      );
      this.eventContainer.append(taskContainer);
    });
  }
}

const renderCalendar = new RenderCalendar();
const tasksList = new TaskList(listOfTasks);
const renderTasks = new RenderTaskList(tasksList);
