import React, {Component} from 'react';
import News from "./News";
import './News.css'

class NewsPage extends Component {

    render() {
        return (
            <React.Fragment>
                <News newsId={this.props.match.params.newsId}/>
            </React.Fragment>
        );
    }
}

export default NewsPage;