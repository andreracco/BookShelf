import React, { Component } from 'react';
import { connect }          from 'react-redux';
import { getBooks }         from '../actions'
import BookItem             from '../widgets/book_item';

class HomeContainer extends Component {

    componentWillMount() {
        this.props.dispatch(getBooks(1,0,'desc'))
    }

    loadmore = () => {
        let count = this.props.books.list.length;
        this.props.dispatch(getBooks(1, count, 'desc', this.props.books.list))
    }

    renderItems = (books) => (
        books.list ?
            books.list.map( item => (
                <BookItem key={item._id} {...item} />
            ))
        : null
    )

    render() {
        return (
            <div>
                {this.renderItems(this.props.books)}
                <div className="loadmore" onClick={this.loadmore}> LOAD MORE </div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        books: state.bookRed
    }
}


export default connect(mapStateToProps)(HomeContainer);