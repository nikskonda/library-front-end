import React, {Component} from 'react';
import {Button, Card, Image, Label} from "semantic-ui-react";
import {ORDER_STATUS} from "../../context";
import {Link} from "react-router-dom";

class BookmarkCover extends Component {

    dateSign = () => {
        // return <Moment>{this.state.newsCover.creationDate}</Moment>;
        let date = new Date(this.props.bookmark.dateTime);
        return (date.getHours() < 10 ? '0' : '') + date.getHours() + ':' + (date.getMinutes() < 10 ? '0' : '') + date.getMinutes() + ' ' +
            (date.getDate() < 10 ? '0' : '') + date.getDate() + '.' + (date.getMonth() + 1 < 10 ? '0' : '') + (date.getMonth() + 1) + '.' + date.getFullYear();

    };

    status = () => {
        let status = new Map(ORDER_STATUS);
        if (this.props.bookmark.status === status.get('new')) {
            return (
                <Label as='a' color='red' tag>{this.props.bookmark.status}</Label>
            );
        }
        if (this.props.bookmark.status === status.get('in_progress')) {
            return (
                <Label as='a' color='violet' tag>{this.props.bookmark.status}</Label>
            );
        }
        if (this.props.bookmark.status === status.get('completed')) {
            return (
                <Label as='a' color='green' tag>{this.props.bookmark.status}</Label>
            );
        }
    };

    render() {
        const bookmark = this.props.bookmark;
        console.log(bookmark.page);
        return (<Card>
                        <Image src='../img/book.jpg'/>
                        <Card.Content>
                            <Card.Header>
                                <Link to={`../book/` + bookmark.book.id}>{bookmark.book.title}</Link>
                            </Card.Header>
                            <Card.Description>Page: {bookmark.page ? bookmark.page : false}</Card.Description>
                            {bookmark.type === 'PDF' ? <Button>
                                <Link to={`/book/${bookmark.book.id}/read/pdf`}>PDF READER</Link>
                            </Button> : false}
                            {bookmark.type === 'EPUB' ?
                                <Link to={`/book/${bookmark.book.id}/read/epub`}><Button>EBUP
                                    READER</Button></Link> : false}
                            <Card.Meta>{this.dateSign()}</Card.Meta>
                        </Card.Content>
                    </Card>);
    }
}


export default BookmarkCover;