import React, {Component} from 'react';
//router - https://habr.com/ru/post/329996/
import {Route, Switch} from 'react-router-dom'
import BookCatalogPage from "./catalog/BookCatalogPage";
import BookRouter from "./book/BookRouter";
import NewsListPage from "./news/NewsListPage";
import NewsPage from "./news/NewsPage";
import SignIn from "./sign/SignIn";
import Header from "./header/Header";
import OrderListPage from "./order/OrderListPage";
import SignUp from "./sign/SignUp";
import SignOut from "./sign/SignOut";
import UserSettings from "./UserSettings";
import BookmarkListPage from "./bookmark/BookmarkListPage";
import BasketPage from "./basket/BasketPage";
import AdminMenu from "./admin/AdminMenu";
import {LOCAL_STORAGE_USER_DATA} from "../context";

class MainRouter extends Component {

    // headerRef = React.createRef();
    //
    // updateBasket = () => this.headerRef.current.cheackBasket();
    //
    // BookCatalogPage = () => <BookCatalogPage updateBasket={this.updateBasket} location={this.location}/>;

    state = {
        isAuthorize: false,
    };

    componentWillMount() {
        let str = localStorage.getItem(LOCAL_STORAGE_USER_DATA);
        if (str && JSON.parse(str).username){
            this.setState({isAuthorize: true});
        }
    }

    changeAuthorizeStatus = () => {
        this.setState({isAuthorize: !this.state.isAuthorize});
    };



    render() {
        return (
            <div style={{position: 'relative', minHeight: '100vh'}}>
                <div style={{paddingBottom: '2.5rem'}}>
                    <Header isAuthorize={this.state.isAuthorize}/>
                    <Switch>
                        <Route exact path='/' component={BookCatalogPage}/>
                        <Route path='/book' component={BookRouter}/>
                        <Route path='/catalog' component={BookCatalogPage}/>
                        <Route exact path='/news' component={NewsListPage}/>

                        <Route path='/news/:newsId' component={NewsPage}/>
                        <Route path='/order/user' component={OrderListPage}/>
                        <Route path='/signIn' render={() => <SignIn changeAuthorizeStatus={this.changeAuthorizeStatus}/>}/>
                        <Route path='/signUp' component={SignUp}/>
                        <Route path='/signOut' render={() => <SignOut changeAuthorizeStatus={this.changeAuthorizeStatus}/>}/>
                        <Route path='/user/settings' component={UserSettings}/>
                        <Route path='/bookmarks' component={BookmarkListPage}/>
                        <Route path='/basket' component={BasketPage}/>
                        <Route path='/admin' component={AdminMenu}/>
                    </Switch>
                </div>
                <Footer/>
            </div>
        );
    }

}

class Footer extends Component{
    render() {
        return (
            <footer style={{backgroundColor: 'black', color: 'white',position: 'absolute', bottom: 0, width: '100%', height: '2.5rem'}}>
                footer
            </footer>
        );
    }

}

export default MainRouter;
