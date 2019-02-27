import React, { Component }                from 'react';
import { connect }                         from 'react-redux';
import { getBookWithReviewer, clearBook }  from '../../actions';

class BookView extends Component {

    componentWillMount() {
        this.props.dispatch(getBookWithReviewer(this.props.match.params.id));
    }

    componentWillUnmount() {
        this.props.dispatch(clearBook());
    }

    renderBook = (book) => (
        
        book.book ? 
            <div className="br_container">

                <div className="br_header">
                    <h2>{book.book.name}</h2>
                    <h5>{book.book.author}</h5>

                    <div className="br_reviewer">
                        <span>Reviewed by</span> {book.reviewer.name} {book.reviewer.lastname}
                    </div>
                </div>

                <div className="br_review">
                    {book.book.review}
                </div>

                <div className="br_box">
                    <div className="left">
                        <div>
                            <span> Pages: </span> {book.book.pages}
                        </div>

                        <div>
                            <span> Price </span> {book.book.price}
                        </div>
                    </div>

                    <div className="right">
                        <span> Rating </span>
                        <div>
                            {book.book.rating}/5
                        </div>
                    </div>

                </div>
            </div>
        : null
    )

    render() {
        let book = this.props.book;
        
        return (
            <div>
                {this.renderBook(book)}
            </div>
        );
    }
}
const mapStateToProps = (state, ownProps) => {
    return {
        book: state.bookRed
    }
}


export default connect(mapStateToProps)(BookView);