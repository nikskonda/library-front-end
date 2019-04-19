import React, {Component} from 'react';
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import BookList from "./BookList";
import GenreList from "./GenreList"
import Row from "react-bootstrap/Row";
import Header from "./Header";

class BookCatalogPage extends Component {

    render() {
        return (
            <React.Fragment>
                <Header/>
                <Container>

                   <Row>
                       <Col lg={3}>
                           <GenreList/>
                       </Col>
                       <Col>
                           <BookList/>
                       </Col>
                   </Row>
               </Container>
            </React.Fragment>
        );
    }
}

export default BookCatalogPage;