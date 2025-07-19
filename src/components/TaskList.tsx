import { useContext, useState } from 'react';
import { TaskContext } from '../context/TaskContext';
import { TaskItem } from './TaskItem';
import { Grid, FormControl, InputLabel, Select, MenuItem, Box, Button } from '@mui/material';
import type { Task } from '../types/task';
import {TaskStatus, TaskCategory, TaskPriority } from '../types/task';

export const TaskList = () => {
  const taskContext = useContext(TaskContext);
  const [filters, setFilters] = useState<Partial<Task>>({});

  if (!taskContext) {
    return <div>Error: TaskContext not available</div>;
  }

  const { filterTasks } = taskContext;
  const filteredTasks = filterTasks(filters);

  return (
    <Box sx={{ p: 2 }}>
      <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
        <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
  <FormControl sx={{ minWidth: 120 }}>
    <InputLabel>Status</InputLabel>
    <Select
      value={filters.status || ''}
      onChange={(e) => setFilters({ ...filters, status: e.target.value as TaskStatus })}
    >
      <MenuItem value="">All</MenuItem>
      {Object.values(TaskStatus).map(status => (
        <MenuItem key={status} value={status}>{status}</MenuItem>
      ))}
    </Select>
  </FormControl>
  <FormControl sx={{ minWidth: 120 }}>
    <InputLabel>Category</InputLabel>
    <Select
      value={filters.category || ''}
      onChange={(e) => setFilters({ ...filters, category: e.target.value as TaskCategory })}
    >
      <MenuItem value="">All</MenuItem>
      {Object.values(TaskCategory).map(category => (
        <MenuItem key={category} value={category}>{category}</MenuItem>
      ))}
    </Select>
  </FormControl>
  <FormControl sx={{ minWidth: 120 }}>
    <InputLabel>Priority</InputLabel>
    <Select
      value={filters.priority || ''}
      onChange={(e) => setFilters({ ...filters, priority: e.target.value as TaskPriority })}
    >
      <MenuItem value="">All</MenuItem>
      {Object.values(TaskPriority).map(priority => (
        <MenuItem key={priority} value={priority}>{priority}</MenuItem>
      ))}
    </Select>
  </FormControl>
</Box>
      </Box>
      <Grid container spacing={2}>
        {filteredTasks.map(task => (
          <Grid item xs={12} sm={6} md={4} key={task.id}>
            <TaskItem task={task} />
          </Grid>
        ))}
      </Grid>
<Button 
  variant="contained" 
  sx={{ mb: 2 }} 
  onClick={() => navigate('/create')}
>
  Add Task
</Button>
    </Box>
  );
};