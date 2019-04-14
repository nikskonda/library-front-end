import React, {Component} from 'react';
import axios from "axios";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import BookList from "./BookList";
import GenreList from "./GenreList"
import LanguageTumbler from "./LanguageTumbler";
import Row from "react-bootstrap/Row";

class BookCatalogPage extends Component {

    render() {
        return (
           <Container>
               {/*<LanguageTumbler/>*/}
               <Row>
                   <Col lg={3}>
                       <GenreList/>
                   </Col>
                   <Col>
                       <BookList/>
                   </Col>
               </Row>
           </Container>
        );
    }
}

export default BookCatalogPage;