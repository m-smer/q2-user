import React from 'react';
import '../../css/style.scss';
import {Route, Routes} from 'react-router-dom';
import QuizPage from '../QuizPage';

const App = () => {
    return (
        <div>
            <Routes>
                <Route path="/" element={<QuizPage />} />
                <Route path="/:quizUrlId" element={<QuizPage />} />
            </Routes>
        </div>
    );
};
App.whyDidYouRender = true;
export default App;
