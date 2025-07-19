import { useNavigate } from "react-router-dom";
import { Card, CardContent, Typography, Chip, Button, Box} from '@mui/material';
import type { Task } from '../types/task';
import { TaskCategory, TaskPriority, TaskStatus } from '../types/task';
import styles from '../styles/TaskItem.module.css';
import React from "react";

interface TaskItemProps {
    task: Task;
}

const getPriorityColor = (priority: TaskPriority) => {
    switch(priority) {
        case TaskPriority.High: return 'error';
        case TaskPriority.Medium: return 'warning';
        case TaskPriority.Low: return 'success';
        default: return 'default';
    }
};

const getStatusColor = (status: TaskStatus) => {
    switch (status) {
        case TaskStatus.Done: return 'success';
        case TaskStatus.InProgress: return 'warning';
        case TaskStatus.ToDo: return 'info';
        default: return 'default';
    }
};

export const TaskItem = React.memo(( {task}: TaskItemProps) => {
    const navigate = useNavigate();

    return (
        <Card className={styles.taskCard}>
            <CardContent>
                <Typography variant="h6" gutterBottom className={styles.title}>
                    {task.title}
                </Typography>
                {task.description && (
                    <Typography variant="body2" color="text.secondary" paragraph className={styles.description}>
                        {task.description}
                    </Typography>
                )}
                <Box sx={{display:'flex', gap:1, flexWrap:'wrap', mb: 2}}>
                    <Chip label={task.category} color='primary' size="small" />
                    <Chip
                    label={task.status} color={getStatusColor(task.status)} size="small"/>
                    <Chip label={task.priority} color={getPriorityColor(task.priority)} size="small" />
                </Box>
                <Button
                variant="contained"
                onClick={()=>navigate(`/task/${task.id}`)}
                >
                    Edit
                </Button>
            </CardContent>
        </Card>
    )
});