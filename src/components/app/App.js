
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {MainPage, ComicsPage} from '../pages'; // не указываем файл index.js тк webpack при обращение к папке ищет файл index.js
import AppHeader from "../appHeader/AppHeader";

const App = () => {
    return (
        <Router>
            <div className="app">
                <AppHeader/>
                <main>
                    <Switch>
                        <Route exact path="/">
                            <MainPage/>
                        </Route>
                        <Route exact path="/comics">
                            <ComicsPage/>
                        </Route>
                    </Switch>
                </main>
            </div>
        </Router>
    )
}

export default App;