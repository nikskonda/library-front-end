import React, {Component} from 'react';
import BookList from "./BookList";
import GenreList from "./GenreList"
import Header from "./Header";
import {Container, Grid, Segment} from "semantic-ui-react";

class BookCatalogPage extends Component {

    render() {
        return (
            <React.Fragment>
                <Header/>
                <Container>
                    <Grid>
                        <Grid.Column width={3}>
                            <GenreList/>
                        </Grid.Column>
                        <Grid.Column stretched width={13}>
                            <Segment>
                                <BookList/>
                            </Segment>
                        </Grid.Column>
                    </Grid>
                </Container>
            </React.Fragment>
        );
    }
}

export default BookCatalogPage;