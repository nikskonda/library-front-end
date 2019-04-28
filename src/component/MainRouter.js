import React from 'react';
//router - https://habr.com/ru/post/329996/
import {Route, Switch} from 'react-router-dom'
import BookCatalogPage from "./catalog/BookCatalogPage";
import BookRouter from "./book/BookRouter";
import NewsListPage from "./news/NewsListPage";
import NewsPage from "./news/NewsPage";
import SignIn from "./SignIn";
import Header from "./Header";
import NewsEdit from "./news/NewsEdit";


const MainRouter = () => (
    <React.Fragment>
        <Header/>
        <Switch>
            <Route exact path='/' component={BookCatalogPage}/>
            <Route path='/book' component={BookRouter}/>
            <Route path='/catalog' component={BookCatalogPage}/>
            <Route exact path='/news' component={NewsListPage}/>
            <Route path='/news/edit' component={NewsEdit}/>
            <Route path='/news/:newsId' component={NewsPage}/>
            <Route path='/signIn' component={SignIn}/>
        </Switch>
    </React.Fragment>

);

export default MainRouter;
