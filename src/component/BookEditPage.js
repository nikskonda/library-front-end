import React, {Component} from 'react';
import Header from "./Header";
import BookEdit from "./BookEdit";

class BookEditPage extends Component {

    render() {
        return (
            <React.Fragment>
                <Header/>
                <BookEdit/>
            </React.Fragment>
        );
    }
}

export default BookEditPage;