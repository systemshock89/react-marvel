
import {lazy, Suspense} from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
// import {MainPage, ComicsPage, SingleComicPage, Page404} from '../pages'; // не указываем файл index.js тк webpack при обращение к папке ищет файл index.js
import AppHeader from "../appHeader/AppHeader";
import Spinner from '../spinner/Spinner';

// все динамические импорты вставляем после статических, иначе может произойти ошибка
const Page404 = lazy(() => import('../pages/404'));
const MainPage = lazy(() => import('../pages/MainPage')); // главную страницу также грузим лениво, тк пользователи часто заходят не на главную, а на стороннюю
const ComicsPage = lazy(() => import('../pages/ComicsPage'));
const SingleComicLayout = lazy(() => import('../pages/singleComicLayout/SingleComicLayout'));
const SingleCharacterLayout = lazy(() => import('../pages/singleCharacterLayout/SingleCharacterLayout'));
const SinglePage = lazy(() => import('../pages/SinglePage'));
// в обычном js мы могли обработать ошибку динамического импорта через блок catch, то здесь сделать этого не можем.
// нужно исп-ть компонет Suspense, кот-й будет отвечать за ошибки импорта и отображение запасного содержимого.

const App = () => {
    return (
        <Router basename={'/react-marvel'}>
            <div className="app">
                <AppHeader/>
                <main>
                    <Suspense fallback={<Spinner/>}>
                        <Routes>
                            <Route path="/" element={<MainPage/>}/>
                            <Route path="/comics" element={<ComicsPage/>}/>
                            <Route path="/comics/:id" element={<SinglePage Component={SingleComicLayout} dataType='comic'/>}/>
                            <Route path="/characters/:id" element={<SinglePage Component={SingleCharacterLayout} dataType='character'/>}/>
                            <Route path="*" element={<Page404/>}/>
                        </Routes>
                    </Suspense>

                </main>
            </div>
        </Router>
    )
}

export default App;