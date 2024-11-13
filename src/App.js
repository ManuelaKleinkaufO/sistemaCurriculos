import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import CreateCurriculum from './components/CreateCurriculum';
import Curriculums from './components/Curriculums';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Curriculums />} />
        <Route path="/criar" element={<CreateCurriculum />} />
      </Routes>
    </Router>
  );
}

export default App;
