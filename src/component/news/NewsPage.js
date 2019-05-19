import React, {Component} from 'react';
import News from "./News";
import './News.css'

class NewsPage extends Component {

    render() {
        return <News newsId={this.props.match.params.newsId}/>;
    }
}

export default NewsPage;