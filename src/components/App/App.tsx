import React from 'react';
import '../../css/style.css';
import '../../css/main.css';
import {Route, Routes} from 'react-router-dom';
import QuizPage from '../QuizPage';
import RedirectPage from '../RedirectPage';

const App = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<QuizPage />} />
                <Route path="/:quizUrlId" element={<QuizPage />} />
                <Route path="/redirect" element={<RedirectPage />} />
            </Routes>
        </>
    );
};
App.whyDidYouRender = true;
export default App;
