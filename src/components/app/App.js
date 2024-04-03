
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {MainPage, ComicsPage} from '../pages'; // не указываем файл index.js тк webpack при обращение к папке ищет файл index.js
import AppHeader from "../appHeader/AppHeader";

const App = () => {
    return (
        <Router>
            <div className="app">
                <AppHeader/>
                <main>
                    <Routes>
                        <Route path="/" element={<MainPage/>}/>
                        <Route path="/comics" element={<ComicsPage/>}/>
                    </Routes>
                </main>
            </div>
        </Router>
    )
}

export default App;