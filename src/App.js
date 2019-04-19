import React, {Component} from 'react';
//router - https://habr.com/ru/post/329996/
import {Route, Switch} from 'react-router-dom'
import './App.css';

import BookCatalogPage from "./component/BookCatalogPage";
import BookPage from "./component/BookPage";

import NewsListPage from "./component/NewsListPage";
import NewsPage from "./component/NewsPage";

import SignIn from "./component/SignIn";


class App extends Component {
    render() {
        return (
            <React.Fragment>
                <Switch>
                    <Route exact path='/' component={BookCatalogPage}/>
                    <Route path='/book/:bookId' component={BookPage}/>
                    <Route path='/catalog' component={BookCatalogPage}/>
                    <Route exact path='/news' component={NewsListPage}/>
                    <Route path='/news/:newsId' component={NewsPage}/>
                    <Route path='/signIn' component={SignIn}/>
                </Switch>
            </React.Fragment>
        );
    }
}

export default App;
