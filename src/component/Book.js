import React, {Component} from 'react';
import axios from "axios";

class Book extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: props.match.params.bookId,
            book: null
        };
        console.log(props);
    }

    componentWillMount() {
        axios
            .get(`http://localhost:8888/book/${this.state.id}`)
            .then(res => {
                console.log(res);
                this.setState({book: res.data});
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    render() {
        return (
            <div>
                <p>{this.state.book!=null ? this.state.book.title : false}</p>
            </div>
        );
    }
}

export default Book;