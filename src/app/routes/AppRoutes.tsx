import { Routes, Route } from 'react-router-dom';
import { TaskList } from '../../features/tasks/ui/TaskList/TaskList';
import { TaskForm } from '../../features/tasks/ui/TaskForm/TaskForm';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<TaskList />} />
      <Route path="/task/:id" element={<TaskForm />} />
      <Route path="/new" element={<TaskForm />} />
    </Routes>
  );
};