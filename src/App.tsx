import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout/Layout';
import ComponentPage from './components/ComponentPage/ComponentPage';
import HomePage from './components/HomePage/HomePage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="components/:componentId" element={<ComponentPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
