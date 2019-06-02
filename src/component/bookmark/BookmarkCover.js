import React, {Component} from 'react';
import {Button, Card, Image} from "semantic-ui-react";
import {BACK_END_SERVER_URL, DEFAULT_L10N_LANGUAGE, LOCAL_STORAGE_UI_LANGUAGE, URL_DOWNLOAD_FILE} from "../../context";
import {Link} from "react-router-dom";
import './Bookmark.css';
import {L10N} from "../../l10n"
import LocalizedStrings from 'react-localization';

class BookmarkCover extends Component {

    dateSign = () => {
        // return <Moment>{this.state.newsCover.creationDate}</Moment>;
        let date = new Date(this.props.bookmark.dateTime);
        return (date.getHours() < 10 ? '0' : '') + date.getHours() + ':' + (date.getMinutes() < 10 ? '0' : '') + date.getMinutes() + ' ' +
            (date.getDate() < 10 ? '0' : '') + date.getDate() + '.' + (date.getMonth() + 1 < 10 ? '0' : '') + (date.getMonth() + 1) + '.' + date.getFullYear();

    };

    render() {
        let strings = new LocalizedStrings(L10N);
        strings.setLanguage(localStorage.getItem(LOCAL_STORAGE_UI_LANGUAGE)?JSON.parse(localStorage.getItem(LOCAL_STORAGE_UI_LANGUAGE)).tag.replace(/-/g, '') : DEFAULT_L10N_LANGUAGE);        const bookmark = this.props.bookmark;
        return (<Card>
                        <Card.Content>
                            <Link to={'/book/' + bookmark.book.id}>
                                <Card.Header textAlign='center'>{bookmark.book.title.toUpperCase()}</Card.Header>
                                <Image src={BACK_END_SERVER_URL + URL_DOWNLOAD_FILE + bookmark.book.thumbnailUrl}/>
                            </Link>
                            {bookmark.page ? <Card.Description>{strings.bookmarks.page+bookmark.page}</Card.Description> : false}
                            {bookmark.type === 'PDF' ? 
                            <Button
                                as={Link}
                                to={`/book/${bookmark.book.id}/read/pdf`}>
                                {strings.bookmarks.pdfRead}
                            </Button> : false}
                            {bookmark.type === 'EPUB' ?
                            <Button
                                as={Link}
                                to={`/book/${bookmark.book.id}/read/epub`}>
                                {strings.bookmarks.epubRead}
                            </Button> : false}
                            <Card.Meta>{this.dateSign()}</Card.Meta>
                        </Card.Content>
                    </Card>);
    }
}


export default BookmarkCover;