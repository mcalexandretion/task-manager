export enum TaskCategory {
    Bug = 'Bug',
    Feature = 'Feature',
    Documentation = 'Documentation',
    Refactor = 'Refactor',
    Test = 'Test'
}

export enum TaskStatus {
    ToDo = 'TO Do',
    InProgress = "In Progress",
    Done = 'Done'
}

export enum TaskPriority {
    Low = 'Low',
    Medium = 'Medium',
    High = 'High'
}

export interface Task {
    id: string;
    title: string;
    description?: string;
    category: TaskCategory;
    status: TaskStatus;
    priority: TaskPriority;
}