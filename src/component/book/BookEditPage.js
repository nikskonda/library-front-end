import React, {Component} from 'react';
import BookEdit from "./BookEdit";

class BookEditPage extends Component {



    render() {
        return (
            <React.Fragment>
                <BookEdit id={this.props.match.params.bookId}/>
            </React.Fragment>
        );
    }
}

export default BookEditPage;