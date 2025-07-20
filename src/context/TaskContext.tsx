import {createContext, useState, useEffect} from 'react';
import type { ReactNode } from 'react';
import type {Task} from '../types/task';
import  { TaskCategory, TaskPriority, TaskStatus} from '../types/task';
import { v4 as uuidv4 } from 'uuid';


interface TaskContextType {
  tasks: Task[];
  addTask: (task: Omit<Task, 'id'>) => void;
  updateTask: (id: string, task: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  filterTasks: (filters: Partial<Task>) => Task[];
}

export const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [
      {
        id: uuidv4(),
        title: 'Implement login feature',
        description: 'Create user authentication system',
        category: TaskCategory.Feature,
        status: TaskStatus.ToDo,
        priority: TaskPriority.High
      }
    ];
  });

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task: Omit<Task, 'id'>) => {
    setTasks([...tasks, { ...task, id: uuidv4() }]);
  };

  const updateTask = (id: string, updatedTask: Partial<Task>) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, ...updatedTask } : task
    ));
  };
const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const filterTasks = (filters: Partial<Task>) => {
    return tasks.filter(task => 
      (!filters.status || task.status === filters.status) &&
      (!filters.category || task.category === filters.category) &&
      (!filters.priority || task.priority === filters.priority)
    );
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, updateTask,deleteTask,filterTasks }}>
      {children}
    </TaskContext.Provider>
  );
};