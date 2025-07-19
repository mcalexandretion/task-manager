import {Children, createContext, useState } from 'react';
import type { ReactNode } from 'react';
import type {Task} from '../types/task';
import  { TaskCategory, TaskPriority, TaskStatus} from '../types/task';
import { v4 as uuidv4 } from 'uuid';

interface TaskContextType {
    tasks: Task[];
    addTask: (task: Omit<Task, 'id'>) => void;
    updateTask: (id: string, task: Partial<Task>) => void;
    filterTasks: (filters: Partial<Task>) => Task[];
}

export const TaskContext = createContext<TaskContextType | undefined> (undefined);

export const TaskProvider = ({children} : {children: ReactNode}) => {
    const [tasks, setTasks] = useState<Task[]>([
    {id: uuidv4(),
      title: 'Implement login feature',
      description: 'Create user authentication system',
      category: TaskCategory.Feature,
      status: TaskStatus.ToDo,
      priority: TaskPriority.High
    },
    {
      id: uuidv4(),
      title: 'Fix navigation bug',
      description: 'Resolve issue with mobile menu',
      category: TaskCategory.Bug,
      status: TaskStatus.InProgress,
      priority: TaskPriority.Medium
    }
    ]);

    const addTask = (task: Omit<Task, 'id'>) => {
        setTasks([...tasks, {...task, id: uuidv4()}]);
    };

    const updateTask = (id: string, updateTask: Partial<Task>) => {
        setTasks(tasks.map( task =>

            task.id === id ? {...task, ...updateTask} : task
        ));
    };

    const filterTasks = (filters: Partial<Task>) => {
    return tasks.filter(task => 
      (!filters.status || task.status === filters.status) &&
      (!filters.category || task.category === filters.category) &&
      (!filters.priority || task.priority === filters.priority)
    );
    };

    return (
        <TaskContext.Provider value={{tasks, addTask, updateTask, filterTasks}}>
            {children}
        </TaskContext.Provider>
    );
};

