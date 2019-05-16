import React, {Component} from 'react';
//router - https://habr.com/ru/post/329996/
import {Route, Switch} from 'react-router-dom'
import BookCatalogPage from "./catalog/BookCatalogPage";
import BookRouter from "./book/BookRouter";
import NewsListPage from "./news/NewsListPage";
import NewsPage from "./news/NewsPage";
import SignIn from "./sign/SignIn";
import Header from "./Header";
import NewsEdit from "./news/NewsEdit";
import OrderListPage from "./order/OrderListPage";
import SignUp from "./sign/SignUp";
import SignOut from "./sign/SignOut";
import UserSettings from "./UserSettings";
import BookmarkListPage from "./bookmark/BookmarkListPage";
import BasketPage from "./basket/BasketPage";
import AdminMenu from "./admin/AdminMenu";

class MainRouter extends Component {

    // headerRef = React.createRef();
    //
    // updateBasket = () => this.headerRef.current.cheackBasket();
    //
    // BookCatalogPage = () => <BookCatalogPage updateBasket={this.updateBasket} location={this.location}/>;

    render() {
        return (
            <React.Fragment>
                {/*<Header ref={this.headerRef}/>*/}
                <Header/>
                <Switch>
                    <Route exact path='/' component={BookCatalogPage}/>
                    <Route path='/book' component={BookRouter}/>
                    <Route path='/catalog' component={BookCatalogPage}/>
                    <Route exact path='/news' component={NewsListPage}/>

                    <Route path='/news/edit/:newsId' component={NewsEdit}/>
                    <Route path='/news/edit' component={NewsEdit}/>

                    <Route path='/news/:newsId' component={NewsPage}/>
                    <Route path='/order/book/:bookId' component={OrderListPage}/>
                    <Route path='/order/user/:userId' component={OrderListPage}/>
                    <Route path='/order/user' component={OrderListPage}/>
                    <Route path='/signIn' component={SignIn}/>
                    <Route path='/signUp' component={SignUp}/>
                    <Route path='/signOut' component={SignOut}/>
                    <Route path='/user/settings/:userId' component={UserSettings}/>
                    <Route path='/user/settings' component={UserSettings}/>
                    <Route path='/bookmarks' component={BookmarkListPage}/>
                    <Route path='/basket' component={BasketPage}/>
                    <Route path='/admin' component={AdminMenu}/>
                </Switch>
            </React.Fragment>
        );
    }

}

export default MainRouter;
