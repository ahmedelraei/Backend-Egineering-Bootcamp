type ID = string;

enum TaskStatus {
  Open = "open",
  InProgress = "in_progress",
  Done = "done",
}

type CreateTaskInput = {
  title: string;
  dueDate?: Date;
};

type UpdateTaskInput = {
  title?: string;
  status?: TaskStatus;
  dueDate?: Date | null;
};

type Task = {
  id: ID;
  title: string;
  status: TaskStatus;
  createdAt: Date;
  dueDate?: Date;
};

type Result<T> =
  | { ok: true; value: T }
  | { ok: false; error: string };

type TaskFilter = {
  status?: TaskStatus;
  search?: string;
};

interface TaskRepository {
  create(task: Task): Task;
  update(id: ID, patch: UpdateTaskInput): Task | null;
  findById(id: ID): Task | null;
  list(filter?: TaskFilter): Task[];
  delete(id: ID): boolean;
}

class InMemoryTaskRepository implements TaskRepository {
  private tasks = new Map<ID, Task>();

  create(task: Task): Task {
    this.tasks.set(task.id, task);
    return task;
  }

  update(id: ID, patch: UpdateTaskInput): Task | null {
    const task = this.tasks.get(id);
    if (!task) {
      return null;
    }

    const updated: Task = {
      ...task,
      title: patch.title?.trim() ? patch.title.trim() : task.title,
      status: patch.status ?? task.status,
      dueDate: patch.dueDate === null ? undefined : patch.dueDate ?? task.dueDate,
    };

    this.tasks.set(id, updated);
    return updated;
  }

  findById(id: ID): Task | null {
    return this.tasks.get(id) ?? null;
  }

  list(filter?: TaskFilter): Task[] {
    let tasks = [...this.tasks.values()];

    if (filter?.status) {
      tasks = tasks.filter((task) => task.status === filter.status);
    }

    if (filter?.search) {
      const query = filter.search.toLowerCase();
      tasks = tasks.filter((task) => task.title.toLowerCase().includes(query));
    }

    return tasks;
  }

  delete(id: ID): boolean {
    return this.tasks.delete(id);
  }
}

class TaskService {
  constructor(private repository: TaskRepository) {}

  createTask(input: CreateTaskInput): Result<Task> {
    const title = input.title.trim();
    if (!title) {
      return { ok: false, error: "Title is required" };
    }

    const task: Task = {
      id: generateId(),
      title,
      status: TaskStatus.Open,
      createdAt: new Date(),
      ...(input.dueDate ? { dueDate: input.dueDate } : {}),
    };

    return { ok: true, value: this.repository.create(task) };
  }

  updateTask(id: ID, patch: UpdateTaskInput): Result<Task> {
    if (patch.title !== undefined && !patch.title.trim()) {
      return { ok: false, error: "Title cannot be empty" };
    }

    const updated = this.repository.update(id, patch);
    if (!updated) {
      return { ok: false, error: "Task not found" };
    }

    return { ok: true, value: updated };
  }

  getTask(id: ID): Result<Task> {
    const task = this.repository.findById(id);
    if (!task) {
      return { ok: false, error: "Task not found" };
    }

    return { ok: true, value: task };
  }

  listTasks(filter?: TaskFilter): Task[] {
    return this.repository.list(filter);
  }

  deleteTask(id: ID): Result<boolean> {
    const removed = this.repository.delete(id);
    if (!removed) {
      return { ok: false, error: "Task not found" };
    }

    return { ok: true, value: true };
  }
}

const generateId = () => `task_${Math.random().toString(36).slice(2, 8)}`;

const repository = new InMemoryTaskRepository();
const service = new TaskService(repository);

const created = service.createTask({ title: "Ship TypeScript demo" });
if (created.ok) {
  console.log("Created:", created.value);
}

const list = service.listTasks({ status: TaskStatus.Open });
console.log("Open tasks:", list.length);

const taskId = created.ok ? created.value.id : "missing";
const updated = service.updateTask(taskId, { status: TaskStatus.Done });
console.log("Updated:", updated);
