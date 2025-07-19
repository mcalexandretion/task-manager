import { useContext, useState } from 'react';
import { TaskContext } from '../context/TaskContext';
import { TaskItem } from './TaskItem';
import { Grid, FormControl, InputLabel, Select, MenuItem, Box, Button } from '@mui/material';
import type { Task } from '../types/task';
import {TaskStatus } from '../types/task';

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
        {/* Можно добавить аналогичные селекторы для category и priority */}
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