import { BrowserRouter } from 'react-router-dom';
import { TaskProvider } from './context/TaskContext';
import { ThemeProviderWrapper } from './context/ThemeContext';
import { AppRoutes } from './routes/AppRoutes';

function App() {
  return (
    <ThemeProviderWrapper>
      <TaskProvider>
        <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <AppRoutes />
        </BrowserRouter>
      </TaskProvider>
    </ThemeProviderWrapper>
  );
}

export default App;