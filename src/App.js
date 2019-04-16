import React, { Component } from 'react';
//router - https://habr.com/ru/post/329996/
import { Switch, Route } from 'react-router-dom'
import './App.css';

import Book from './component/Book';
import BookList from './component/BookList';
import NewsList from './component/NewsList';
import BookCatalogPage from "./component/BookCatalogPage";
import SignIn from "./component/SignIn";

class App extends Component {
  render() {
    return (
      <div>
          <Switch>
              <Route exact path='/' component={BookCatalogPage}/>
              <Route path='/book/:bookId' component={Book}/>
              <Route path='/catalog' component={BookCatalogPage}/>
              <Route path='/newsList' component={NewsList}/>
              <Route path='/signIn' component={SignIn}/>
          </Switch>
      </div>
    );
  }
}

export default App;
