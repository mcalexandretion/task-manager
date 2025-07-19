import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TaskContext } from '../context/TaskContext';
import { useThemeContext } from '../context/ThemeContext';
import { TaskItem } from './TaskItem';
import { Box, FormControl, InputLabel, Select, MenuItem, Button, Typography, IconButton } from '@mui/material';
import { Grid } from '@mui/material'; // Используем старый Grid
import { TaskStatus, TaskCategory, TaskPriority } from '../types/task';
import type { Task } from '../types/task';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import styles from '../styles/TaskList.module.css';

export const TaskList = () => {
  const taskContext = useContext(TaskContext);
  const { themeMode, toggleTheme } = useThemeContext();
  const navigate = useNavigate();
  const [filters, setFilters] = useState<Partial<Task>>({});

  if (!taskContext) {
    return <Typography color="error" align="center">Error: TaskContext is not available</Typography>;
  }

  const { filterTasks } = taskContext;
  const filteredTasks = filterTasks(filters);

  return (
    <Box className={styles.taskListContainer}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography className="app-title">
          Task Manager
        </Typography>
        <IconButton onClick={toggleTheme} color="inherit">
          {themeMode === 'light' ? <Brightness4Icon /> : <Brightness7Icon />}
        </IconButton>
      </Box>
      <Box sx={{ display: 'flex', gap: 2, mb: 4, flexWrap: 'wrap', justifyContent: 'center' }}>
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>Status</InputLabel>
          <Select
            value={filters.status || ''}
            onChange={(e) => setFilters({ ...filters, status: e.target.value as TaskStatus })}
            variant="outlined"
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
            variant="outlined"
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
            variant="outlined"
          >
            <MenuItem value="">All</MenuItem>
            {Object.values(TaskPriority).map(priority => (
              <MenuItem key={priority} value={priority}>{priority}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate('/new')}
        >
          Add Task
        </Button>
      </Box>
      {filteredTasks.length === 0 ? (
        <Typography variant="h6" align="center" sx={{ mt: 4, color: 'text.secondary' }}>
          No tasks match the selected filters
        </Typography>
      ) : (
        <Grid container spacing={2}>
          {filteredTasks.map(task => (
            <Grid item xs={12} sm={6} md={4} key={task.id}>
              <TaskItem task={task} />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};