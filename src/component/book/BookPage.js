import React, {Component} from 'react';
import Book from "./Book";

class BookPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: props.match.params.bookId,
        };
    }

    render() {
        return (
            <React.Fragment>
                <Book id={this.state.id}/>
            </React.Fragment>
        );
    }
}

export default BookPage;