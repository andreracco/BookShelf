import React, { PureComponent } from 'react';
import { connect }              from 'react-redux';
import { getUsers, addUser }    from '../../actions';

class Register extends PureComponent {

    state = {
        name:       '',
        lastname:   '',
        email:      '',
        password:   '',
        error:      ''
    }

    componentWillMount() {
        this.props.dispatch(getUsers());
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.user.added === false) {
            this.setState({
                error: 'Error, try again'
            })
        } else {
            this.setState({
                name:       '',
                lastname:   '',
                email:      '',
                password:   '',
                error:      ''
            })
        }
    }

    handleInputName     = (event) => this.setState({name:     event.target.value})
    handleInputLastname = (event) => this.setState({lastname: event.target.value})
    handleInputEmail    = (event) => this.setState({email:    event.target.value})
    handleInputPassword = (event) => this.setState({password: event.target.value})

    submitForm = (e) => {
        e.preventDefault();
        this.setState({error: ''})

        this.props.dispatch(addUser({
            email:      this.state.email,
            password:   this.state.password,
            name:       this.state.name,
            lastname:   this.state.lastname
        }, this.props.user.users));

        if (this.props.user.added) {
            this.resetState();
        }
    }

    showUsers = (user) => (
        user.users ?
            user.users.map(user => (
                <tr key={user._id}>
                    <td>{user.name}</td>
                    <td>{user.lastname}</td>
                    <td>{user.email}</td>
                </tr>
            ))
        : null
    )

    render() {

        let user = this.props.user;
        
        return (
            <div className="rl_container">

                <form onSubmit={this.submitForm}>
                    <h2>ADD USER</h2>

                    <div className="form_element">
                        <input type="text" 
                               placeholder="Enter name" 
                               value={this.state.name}
                               onChange={(event) => this.handleInputName(event)}
                        />
                    </div>

                    <div className="form_element">
                        <input type="text" 
                               placeholder="Enter lastname" 
                               value={this.state.lastname}
                               onChange={(event) => this.handleInputLastname(event)}
                        />
                    </div>

                    <div className="form_element">
                        <input type="text" 
                               placeholder="Enter email" 
                               value={this.state.email}
                               onChange={(event) => this.handleInputEmail(event)}
                        />
                    </div>

                    <div className="form_element">
                        <input type="password" 
                               placeholder="Enter password" 
                               value={this.state.password}
                               onChange={(event) => this.handleInputPassword(event)}
                        />
                    </div>

                    <button type="submit">ADD</button>

                    <div className="error">
                        {
                            this.state.error
                        }
                    </div>

                </form>

                <div className="current_users">
                    <h4> CURRENT USERS </h4>
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Last Name</th>
                                <th>Email</th>
                            </tr>
                        </thead>

                        <tbody>
                            {this.showUsers(user)}
                        </tbody>
                    </table>
                </div>

            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        users: state.userRed
    }
}

export default connect(mapStateToProps)(Register)