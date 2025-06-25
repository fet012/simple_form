import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FormComponent from './components/form';
import ThankYouPage from './components/response';
import { Form } from './components/test';
import './App.css';

function App() {
  return (
    // SETTING routes for navigationkk
    <Router>
      <Routes>
        <Route path="/" element={<FormComponent/>} />
        <Route path="/submitted" element={<ThankYouPage />} />
      </Routes>
    </Router>
  );
}

export default App;