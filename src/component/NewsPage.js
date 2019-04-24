import React, {Component} from 'react';
import Header from "./Header";
import News from "./News";

class NewsPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: props.match.params.newsId,
        };
    }

    render() {
        return (
            <React.Fragment>
                <Header/>
                <News id={this.state.id}/>
            </React.Fragment>
        );
    }
}

export default NewsPage;