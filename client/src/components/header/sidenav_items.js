
import React        from 'react';
import { Link }     from 'react-router-dom';
import FontAwesome  from 'react-fontawesome';
import { connect }  from 'react-redux';

const SidenavItems = ({user}) => {

    const items = [
        {
            type: 'navItem',
            icon: 'fa fa-home',
            text: 'Home',
            link: '/',
            restricted: false
        },

        {
            type: 'navItem',
            icon: 'fa fa-file-alt',
            text: 'My Profile',
            link: '/user',
            restricted: true
        },

        {
            type: 'navItem',
            icon: 'fa fa-file-alt',
            text: 'Add Admins',
            link: '/user/register',
            restricted: true
        },

        {
            type: 'navItem',
            icon: 'fa fa-sign-in-alt',
            text: 'Login',
            link: '/login',
            restricted: false,
            exclude:    true
        },

        {
            type: 'navItem',
            icon: 'fa fa-file-alt',
            text: 'My Reviews',
            link: '/user/reviews',
            restricted: true
        },

        {
            type: 'navItem',
            icon: 'fa fa-file-alt',
            text: 'Add reviews',
            link: '/user/add',
            restricted: true
        },

        {
            type: 'navItem',
            icon: 'fa fa-sign-out-alt',
            text: 'Logout',
            link: '/user/logout',
            restricted: true
        }

    ]

    const showItems = () => (
        user.login ?
            items.map( (item, i) => {
                if (user.login.isAuth) {
                    return !item.exclude ? element(item, i) : null
                } else {
                    return !item.restricted ? element(item, i) : null
                }        
            })
        : null
    )

    const element = (item, i) => (
        <div key={i} className={item.type}>
            <Link to={item.link}>
                <FontAwesome name={item.icon} />
                {item.text}
            </Link>
        </div>
    )

    return (
        <div>
            {showItems()}
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        user: state.userRed
    }
}

export default connect(mapStateToProps)(SidenavItems)