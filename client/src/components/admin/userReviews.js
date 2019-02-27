import React, { Component } from 'react';
import { connect }          from 'react-redux';
import { getUserReviews }   from '../../actions';
import moment               from 'moment-js';
import { Link }             from 'react-router-dom';

class UserReviews extends Component {

    componentWillMount() {
        this.props.dispatch(getUserReviews(this.props.user.login.id));
    }

    showReviews = (user) => (
        user.reviews ?
            user.reviews.map(review => (
                <tr key={review._id}>
                    <td><Link to={`/user/edit-post/${review._id}`}>{review.name}</Link></td>
                    <td>{review.author}</td>
                    <td>{moment(review.createdAt).format('YYYY-MM-DD')}</td>
                </tr>
            ))
        : null
    )

    render() {
        let user = this.props.user;
        
        return (
            <div className="user_posts">
                <h4> Reviews </h4>
                
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Author</th>
                            <th>Date</th>
                        </tr>
                    </thead>

                    <tbody>
                        {this.showReviews(user)}
                    </tbody>
                </table>
                
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.userRed
    }
}

export default connect(mapStateToProps)(UserReviews)