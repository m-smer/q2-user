import React, {useState} from 'react';
import '../../css/style.scss';
// import 'react-toastify/dist/ReactToastify.min.css';
// import Header from '../Header';
// import {Route, Routes} from 'react-router-dom';
// import Home from '../../pages/home';
// import EditQuiz from '../../pages/editQuiz';
// import Sidebar from '../Sidebar';
// import {ToastContainer} from 'react-toastify';
// import SignIn from '../../pages/signIn';
// import {useAuth} from '../../redux/hooks/useAuth';

export default function App() {
    return <div>123</div>;
    // const [sidebarOpen, setSidebarOpen] = useState(false);
    //
    // const {user} = useAuth();
    //
    // if (!user) {
    //     return <SignIn />;
    // }
    //
    // return (
    //     <div className="flex h-screen overflow-hidden">
    //         <ToastContainer />
    //         <Sidebar
    //             sidebarOpen={sidebarOpen}
    //             setSidebarOpen={setSidebarOpen}
    //         />
    //
    //         <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden bg-white">
    //             <Header
    //                 sidebarOpen={sidebarOpen}
    //                 setSidebarOpen={setSidebarOpen}
    //             />
    //             <main>
    //                 <Routes>
    //                     <Route path="/" element={<Home />} />
    //                     {/*<Route path="signin/" element={<SignIn />} />*/}
    //                     <Route path="editQuiz/:quizId" element={<EditQuiz />} />
    //                 </Routes>
    //             </main>
    //         </div>
    //     </div>
    // );
}
