import React, {Component} from 'react';
import BookList from "./BookList";
import GenreList from "./GenreList"
import Header from "./Header";
import {Container, Grid, Segment} from "semantic-ui-react";
import queryString from 'query-string';


class BookCatalogPage extends Component {

    state = {
        params: null
    };

    componentWillMount(){
        this.updateParams();
    };

    updateParams = () => {
        this.setState({params: queryString.parse(this.props.location.search)});
    };

    changeUrl = (params) => {
        this.props.history.push({search: queryString.stringify(params)});
        this.updateParams();
    };

    render() {
        return (
            <React.Fragment>
                <Header/>
                <Container>

                    <Grid>
                        <Grid.Column width={3}>
                                <GenreList location={this.props.location}/>
                        </Grid.Column>
                        <Grid.Column stretched width={13}>
                            <Segment>
                                <BookList changeUrl={this.changeUrl} params={this.state.params}/>
                            </Segment>
                        </Grid.Column>
                    </Grid>
                </Container>
            </React.Fragment>
        );
    }
}

export default BookCatalogPage;