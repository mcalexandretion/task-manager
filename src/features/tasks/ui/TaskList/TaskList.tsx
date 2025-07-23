import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useThemeContext } from '../../../shared/ui/ThemeProvider/ThemeProvider';
import { TaskItem } from '../TaskItem/TaskItem';
import { Box, FormControl, InputLabel, Select, MenuItem, Button, Typography, IconButton } from '@mui/material';
import { TaskStatus, TaskCategory, TaskPriority } from '../../../entities/task/types/task';
import type { Task } from '../../../entities/task/types/task';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useTaskStore } from '../../model/taskStore';
import styles from './TaskList.module.css';

export const TaskList = () => {
  const navigate = useNavigate();
  const { themeMode, toggleTheme } = useThemeContext();
  const [filters, setFilters] = useState<Partial<Task>>({});
  const { filterTasks } = useTaskStore();
  const filteredTasks = filterTasks(filters);

  return (
    <Box className={styles.taskListContainer}>
      <Box className={styles.header}>
        <Typography className="app-title">Task Manager</Typography>
        <IconButton onClick={toggleTheme}>
          {themeMode === 'light' ? <Brightness4Icon /> : <Brightness7Icon />}
        </IconButton>
      </Box>
      <Box className={styles.filters}>
        <FormControl className={styles.formControl}>
          <InputLabel>Status</InputLabel>
          <Select
            value={filters.status || ''}
            onChange={(e) => setFilters({ ...filters, status: e.target.value as TaskStatus })}
            variant="outlined"
          >
            <MenuItem value="">All</MenuItem>
            {Object.values(TaskStatus).map((status) => (
              <MenuItem key={status} value={status}>{status}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl className={styles.formControl}>
          <InputLabel>Category</InputLabel>
          <Select
            value={filters.category || ''}
            onChange={(e) => setFilters({ ...filters, category: e.target.value as TaskCategory })}
            variant="outlined"
          >
            <MenuItem value="">All</MenuItem>
            {Object.values(TaskCategory).map((category) => (
              <MenuItem key={category} value={category}>{category}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl className={styles.formControl}>
          <InputLabel>Priority</InputLabel>
          <Select
            value={filters.priority || ''}
            onChange={(e) => setFilters({ ...filters, priority: e.target.value as TaskPriority })}
            variant="outlined"
          >
            <MenuItem value="">All</MenuItem>
            {Object.values(TaskPriority).map((priority) => (
              <MenuItem key={priority} value={priority}>{priority}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button variant="contained" color="primary" onClick={() => navigate('/new')}>
          Add Task
        </Button>
      </Box>
      {filteredTasks.length === 0 ? (
        <Typography variant="h6" className={styles.noTasks}>No tasks match the selected filters</Typography>
      ) : (
        <div className={styles.taskGrid}>
          {filteredTasks.map((task) => (
            <div className={styles.taskGridItem} key={task.id}>
              <TaskItem task={task} />
            </div>
          ))}
        </div>
      )}
    </Box>
  );
};