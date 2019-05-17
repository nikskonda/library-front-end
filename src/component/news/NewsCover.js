import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import {Card, Icon, Image} from 'semantic-ui-react';
import {BACK_END_SERVER_URL, URL_DOWNLOAD_FILE, LOCAL_STORAGE_USER_DATA, ROLE_ADMIN} from "../../context";

class NewsCover extends Component {


    state = {
        newsCover: this.props.newsCover
    };


    dateSign = () => {
        // return this.state.userList.modificationDate === undefined ? this.state.userList.creationDate : 'm:' + this.state.userList.modificationDate;
        // return <Moment>{this.state.newsCover.creationDate}</Moment>;
        let date = new Date(this.state.newsCover.creationDate);
        let now = new Date();
        if (now.getFullYear() === date.getFullYear() && now.getMonth() === date.getMonth() && now.getDate() === date.getDate()) {
            return (date.getHours()<10? '0':'') + date.getHours() + ':' + (date.getMinutes()<10? '0':'') + date.getMinutes();
        } else {
            return (date.getDate()<10? '0':'')+ date.getDate() + '.' + (date.getMonth() + 1<10? '0':'')+(date.getMonth() + 1) + '.' + date.getFullYear();
        }
    };

    userSign = () => {
        if (this.state.newsCover.creator.firstName === undefined && this.state.newsCover.creator.lastName === undefined) {
            return this.state.newsCover.creator.username;
        }
        if (this.state.newsCover.creator.firstName === undefined) {
            return this.state.newsCover.creator.lastName;
        }
        if (this.state.newsCover.creator.lastName === undefined) {
            return this.state.newsCover.creator.firstName;
        }
        return this.state.newsCover.creator.firstName + ' ' + this.state.newsCover.creator.lastName;
    };

    isAdmin(){
        let user = localStorage.getItem(LOCAL_STORAGE_USER_DATA);
        if (user) return user.includes(ROLE_ADMIN);
        else return false;
    }

    render() {
        return (
            <Card>
                <Image src={BACK_END_SERVER_URL+URL_DOWNLOAD_FILE+this.state.newsCover.thumbnailUrl}/>
                <Card.Content>
                    <Card.Header>
                        <Link to={'news/' + this.state.newsCover.id}>{this.state.newsCover.title}</Link>
                    </Card.Header>
                    <Card.Meta>Added {this.dateSign()}</Card.Meta>
                    {/*<Card.Description>Daniel is a comedian living in Nashville.</Card.Description>*/}
                </Card.Content>
                <Card.Content
                    
                    extra>
                    <Link 
                        style={{cursor: this.isAdmin()?'pointer':'default'}}
                        className='linkToUser'
                        to={this.isAdmin()?'admin/user/settings/'+this.state.newsCover.creator.id:false}
                    >
                        <Icon name='user'/>
                        {this.userSign()}
                    </Link>
                </Card.Content>
            </Card>
        );
    }
}


export default NewsCover;