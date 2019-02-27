import React, { Component } from 'react';
import FontAwesome          from 'react-fontawesome';
import { Link }             from 'react-router-dom';
import Nav                  from './sidenav'

class Header extends Component {

    state = {
        showNav: false
    }

    onHideNav = () => {
        this.setState({showNav: false})
    }

    render() {
        return (
            <header>

                <div className="open_nav">
                    <FontAwesome name="bars"
                        onClick={ () => this.setState({showNav: true})}
                        style={{
                            color:   '#fff',
                            padding: '10px',
                            curso:   'pointer'
                        }}
                    />
                </div>

                <Nav 
                    showNav={this.state.showNav}
                    onHideNav={ () => this.onHideNav() }
                />

                <Link to="/" className="logo">
                    bookSHELF
                </Link>

            </header>
        );
    }
}

export default Header;