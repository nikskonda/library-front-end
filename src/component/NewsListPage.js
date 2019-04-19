import React, {Component} from 'react';
import {Container} from "react-bootstrap";
import Header from "./Header";
import NewsList from "./NewsList";

class NewsListPage extends Component {

    render() {
        return (
            <React.Fragment>
                <Header/>
                <Container>
                    <NewsList/>
                </Container>
            </React.Fragment>
        );
    }
}

export default NewsListPage;