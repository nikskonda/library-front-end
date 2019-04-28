import React from 'react';
//router - https://habr.com/ru/post/329996/
import {Route, Switch} from 'react-router-dom'

import BookPage from "./BookPage";
import BookEditPage from "./BookEditPage";


const BookRouter = () => (
    <Switch>
        <Route path='/book/edit' component={BookEditPage}/>
        <Route path='/book/:bookId' component={BookPage}/>
    </Switch>
);

export default BookRouter;
