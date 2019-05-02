import React, {Component} from 'react';
import News from "./News";

class NewsPage extends Component {

    render() {
        return (
            <React.Fragment>
                <News id={this.props.match.params.newsId}/>
            </React.Fragment>
        );
    }
}

export default NewsPage;