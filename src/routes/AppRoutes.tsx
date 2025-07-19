import { Routes, Route } from 'react-router-dom';
import { TaskList } from '../components/TaskList';
import { TaskDetails } from '../components/TaskDetails';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<TaskList />} />
      <Route path="/task/:id" element={<TaskDetails />} />
<Route path="/create" element={<TaskDetails />} />
    </Routes>
  );
};