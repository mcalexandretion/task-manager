import { useContext, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TaskContext } from '../context/TaskContext';
import {TaskCategory, TaskStatus, TaskPriority } from '../types/task';
import type {Task} from '../types/task';
import { 
  Box, 
  TextField, 
  Select, 
  MenuItem, 
  Button, 
  FormControl, 
  InputLabel,
  Typography 
} from '@mui/material';

export const TaskDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const taskContext = useContext(TaskContext);
  
  if (!taskContext || !id) {
    return <Typography>Error: TaskContext or ID not available</Typography>;
  }

  const { tasks, updateTask } = taskContext;
  const task = tasks.find(t => t.id === id);
  
  if (!task) {
    return <Typography>Task not found</Typography>;
  }

  const [formData, setFormData] = useState<Task>(task);

  const handleSubmit = () => {
    updateTask(id, formData);
    navigate('/');
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', p: 3 }}>
      <Typography variant="h4" gutterBottom>Edit Task</Typography>
      <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          label="Title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />
        <TextField
          label="Description"
          value={formData.description || ''}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          multiline
          rows={4}
        />
        <FormControl>
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
        <FormControl>
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
        <FormControl>
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
        <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
          <Button variant="contained" onClick={handleSubmit}>
            Save
          </Button>
          <Button variant="outlined" onClick={() => navigate('/')}>
            Cancel
          </Button>
        </Box>
      </Box>
    </Box>
  );
};