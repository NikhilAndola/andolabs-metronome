import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { StudioHome } from './pages/StudioHome';
import { MetronomePage } from './pages/MetronomePage';
import { NotFoundPage } from './pages/NotFoundPage';

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* AndolaLabs Studio Landing Page */}
        <Route path="/" element={<StudioHome />} />

        {/* AndolaLabs MetroNome Product Showcase & DSP Web Simulator */}
        <Route path="/metronome" element={<MetronomePage />} />

        {/* 404 Fallback */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
