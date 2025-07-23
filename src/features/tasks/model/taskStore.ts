import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';
import { TaskCategory, TaskPriority, TaskStatus } from '../../entities/task/types/task';
import type { Task } from '../../entities/task/types/task';

interface TaskState {
  tasks: Task[];
  createTask: (task: Omit<Task, 'id' | 'createdAt'>) => void;
  updateTask: (id: string, task: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  filterTasks: (filters: Partial<Task>) => Task[];
}

export const useTaskStore = create<TaskState>()(
  persist(
    (set, get) => ({
      tasks: [
        {
          id: uuidv4(),
          title: 'Implement login feature',
          description: 'Create user authentication system',
          category: TaskCategory.Feature,
          status: TaskStatus.ToDo,
          priority: TaskPriority.High,
          createdAt: new Date().toISOString()
        }
      ],
      createTask: (task) =>
        set((state) => ({
          tasks: [...state.tasks, { ...task, id: uuidv4(), createdAt: new Date().toISOString() }]
        })),
      updateTask: (id, updatedTask) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id ? { ...task, ...updatedTask } : task
          )
        })),
      deleteTask: (id) =>
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== id)
        })),
      filterTasks: (filters) =>
        get().tasks.filter(
          (task) =>
            (!filters.status || task.status === filters.status) &&
            (!filters.category || task.category === filters.category) &&
            (!filters.priority || task.priority === filters.priority)
        )
    }),
    {
      name: 'tasks-storage',
      storage: {
        getItem: (name) => {
          const value = localStorage.getItem(name);
          return value ? JSON.parse(value) : null;
        },
        setItem: (name, value) => localStorage.setItem(name, JSON.stringify(value)),
        removeItem: (name) => localStorage.removeItem(name)
      }
    }
  )
);