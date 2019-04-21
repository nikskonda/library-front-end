import React from 'react';
//router - https://habr.com/ru/post/329996/
import {Route, Switch} from 'react-router-dom'
import BookCatalogPage from "./BookCatalogPage";
import BookRouter from "./BookRouter";
import NewsListPage from "./NewsListPage";
import NewsPage from "./NewsPage";
import SignIn from "./SignIn";


const MainRouter = () => (
    <Switch>
        <Route exact path='/' component={BookCatalogPage}/>
        <Route path='/book' component={BookRouter}/>
        <Route path='/catalog' component={BookCatalogPage}/>
        <Route exact path='/news' component={NewsListPage}/>
        <Route path='/news/:newsId' component={NewsPage}/>
        <Route path='/signIn' component={SignIn}/>
    </Switch>
);

export default MainRouter;
