import React, { PureComponent } from 'react';
import { connect }              from 'react-redux';
import { Link }                 from 'react-router-dom';
import { updateBook,
         getBook, 
         deleteBook, 
         clearEditBook }        from '../../actions';

class EditPost extends PureComponent {

    state = {
        formdata: {
            _id:    this.props.match.params.id,
            name:   '',
            author: '',
            review: '',
            pages:  '',
            price:  '',
            rating: ''
        }
    }

    componentWillMount() {
        this.props.dispatch(getBook(this.props.match.params.id));
    }

    componentWillUnmount() {
        this.props.dispatch(clearEditBook());
    }

    componentWillReceiveProps(nextProps) {
        let book = nextProps.book.book;

        this.setState({
            formdata: {
                _id:    book._id,
                name:   book.name,
                author: book.author,
                review: book.review,
                pages:  book.pages,
                price:  book.price,
                rating: book.rating
            }
        })
    }

    handleInput = (event, name) => {
        
        const newFormData = {...this.state.formdata}
        newFormData[name] = event.target.value

        this.setState({
            formdata: newFormData
        })
    }

    submitForm = (e) => {
        e.preventDefault();
        
        this.props.dispatch(updateBook({
            ...this.state.formdata
        }))
    }

    deleteHandler = () => {
        this.props.dispatch(deleteBook(this.props.match.params.id));
    }

    redirectOnDelete = () => {
        setTimeout(() => {
            this.props.history.push('/user/reviews')
        }, 1000);
    }

    render() {
        let book = this.props.book;
        
        return (
            <div className="rl_container article">

                {
                    book.updateBook ?
                        <div className="edit_confirm">
                            UPDATED -<Link to={`/book/${book.book._id}`}> CLICK HERE </Link>
                        </div>
                    : null
                }

                {
                    book.deleted ?
                        <div className="red_tag">
                            DELETED
                            {this.redirectOnDelete()}
                        </div>
                    : null
                }

                <form onSubmit={this.submitForm}>
                    <h2> Edit Review </h2>

                    <div className="form_element">
                        <input type="text" 
                            placeholder="Enter name" 
                            value={this.state.formdata.name}
                            onChange={(event) => this.handleInput(event, 'name')}
                        />
                    </div>

                    <div className="form_element">
                        <input type="text" 
                            placeholder="Enter author" 
                            value={this.state.formdata.author}
                            onChange={(event) => this.handleInput(event, 'author')}
                        />
                    </div>

                    <div className="form_element">
                        <textarea
                            placeholder="Type the review" 
                            value={this.state.formdata.review} 
                            onChange={(event) => this.handleInput(event, 'review')}
                        />
                    </div>

                    <div className="form_element">
                        <input type="number" 
                            placeholder="Enter pages" 
                            value={this.state.formdata.pages}
                            onChange={(event) => this.handleInput(event, 'pages')}
                        />
                    </div>

                    <div className="form_element">
                        <select value={this.state.formdata.rating} onChange={(event) => this.handleInput(event, 'rating')}>
                            <option val="1"> 1 </option>
                            <option val="2"> 2 </option>
                            <option val="3"> 3 </option>
                            <option val="4"> 4 </option>
                            <option val="5"> 5 </option>
                        </select>
                    </div>

                    <div className="form_element">
                        <input type="number" 
                            placeholder="Enter price" 
                            value={this.state.formdata.price}
                            onChange={(event) => this.handleInput(event, 'price')}
                        />
                    </div>

                    <button type="submit"> UPDATE </button>

                    <div className="delete_post">
                        <div className="button" onClick={this.deleteHandler}>
                            DELETE
                        </div>
                    </div>

                </form>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        book: state.bookRed
    }
}

export default connect(mapStateToProps)(EditPost)