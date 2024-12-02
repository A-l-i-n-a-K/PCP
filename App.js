import React from 'react'; 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import MainPage from './pages/MainPage/MainPage';
import SportsmanProfile from './pages/Sportsman/SportsmanProfilePage/SportsmanProfile';
import CoachProfile from './pages/Coach/CoachProfilePage/CoachProfile';
import SportsmanData from './pages/Sportsman/SportsmanDataPage/SportsmanData';
import Analysis from './pages/Sportsman/AnalysisPage/Analysis';
import PsychologyTest from './pages/Sportsman/PsychologyTestPage/PsychologyTestPage';
import Survey from './pages/Sportsman/PsychologyTestPage/Survey';
import SportsmanForCoach from './pages/Coach/SportsmanForCoachPage/SportsmanForCoach';
import SportsmanPage from './pages/Coach/SportsmanPage/SportsmanPage';
import AnalysisCoach from './pages/Coach/AnalysisPageCoach/AnalysisPageCoach';

function App() {
  return (
    <div>
        <Router>
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/sportsmanProfile" element={<SportsmanProfile />} />
              <Route path="/coachProfile" element={<CoachProfile />} />
              <Route path="/sportsmanData" element={<SportsmanData />} />
              <Route path="/analysis" element={<Analysis />} />
              <Route path="/psychologyTest" element={<PsychologyTest />} />
              <Route path="/survey" element={<Survey />} />
              <Route path="/sportsmans" element={< SportsmanForCoach/>} />
              <Route path="/sportsman/:id" element={< SportsmanPage/>} />
              <Route path="/analysisSportsman/:id" element={< AnalysisCoach/>} />
            </Routes>
        </Router>
    </div>
  );
}

export default App;