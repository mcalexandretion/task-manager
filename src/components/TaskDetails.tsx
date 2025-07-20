import { useContext, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TaskContext } from '../context/TaskContext';
import { TaskCategory, TaskStatus, TaskPriority } from '../types/task';
import type { Task } from '../types/task';
import { 
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Typography,
  Box,
  Button
} from '@mui/material';
import styles from '../styles/TaskDetail.module.css';

export const TaskDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const taskContext = useContext(TaskContext);
  
  if (!taskContext) {
    return <Typography>Error: TaskContext not available</Typography>;
  }

  const { tasks, addTask, updateTask, deleteTask} = taskContext;
  const task = id ? tasks.find(t => t.id === id) : null;
  
  const initialFormData: Task = task || {
    id: '',
    title: '',
    description: '',
    category: TaskCategory.Feature,
    status: TaskStatus.ToDo,
    priority: TaskPriority.Medium
  };

  const [formData, setFormData] = useState<Task>(initialFormData);

  const handleSubmit = () => {
    if (id) {
      updateTask(id, formData);
    } else {
      addTask(formData);
    }
    navigate('/');
  };

  const handleDelete = () => {
    if (id) {
      deleteTask(id);
      navigate('/');
    }
  };

  return (
    <Box className={styles.container}>
      <Typography className="app-title">Edit Task</Typography>
      <Box component="form" className={styles.form}>
        <TextField
          label="Title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
          fullWidth
        />
        <TextField
          label="Description"
          value={formData.description || ''}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          multiline
          rows={4}
          fullWidth
        />
        <FormControl fullWidth>
          <InputLabel>Category</InputLabel>
          <Select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value as TaskCategory })}
          >
            {Object.values(TaskCategory).map(category => (
              <MenuItem key={category} value={category}>{category}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel>Status</InputLabel>
          <Select
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value as TaskStatus })}
          >
            {Object.values(TaskStatus).map(status => (
              <MenuItem key={status} value={status}>{status}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel>Priority</InputLabel>
          <Select
            value={formData.priority}
            onChange={(e) => setFormData({ ...formData, priority: e.target.value as TaskPriority })}
          >
            {Object.values(TaskPriority).map(priority => (
              <MenuItem key={priority} value={priority}>{priority}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <Box className={styles.buttonsContainer}>
          <Button variant="contained" onClick={handleSubmit}>
            Save
          </Button>
          <Button variant="outlined" onClick={() => navigate('/')}>
            Cancel
          </Button>
          {id && (
            <Button variant="contained" color="error" onClick={handleDelete}>
              Delete
            </Button>
          )}
        </Box>
      </Box>
    </Box>
  );
};