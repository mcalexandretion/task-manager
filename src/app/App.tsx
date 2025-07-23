import { BrowserRouter } from 'react-router-dom';
import { ThemeProviderWrapper } from '../features/shared/ui/ThemeProvider/ThemeProvider';
import { AppRoutes } from './routes/AppRoutes';

function App() {
  return (
    <ThemeProviderWrapper>
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <AppRoutes />
      </BrowserRouter>
    </ThemeProviderWrapper>
  );
}

export default App;