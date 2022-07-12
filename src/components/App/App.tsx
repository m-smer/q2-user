import React from 'react';
import '../../css/style.scss';
import {Route, Routes} from 'react-router-dom';
import Quiz from '../Quiz';

export default function App() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<div>Квиз не выбран.</div>} />
                <Route path="/:quizUrlId" element={<Quiz />} />
            </Routes>
        </div>
    );
}
