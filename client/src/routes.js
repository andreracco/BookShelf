import React             from 'react';
import { Switch, Route } from 'react-router-dom';

import Layout   from './hoc/layout';
import Home     from './components/home/home';
import BookView from './components/book';
import Login    from './containers/admin/login';
import User     from './components/admin';
import AddRev   from './containers/admin/add';
import EditRev  from './containers/admin/edit';
import UserRev  from './components/admin/userReviews';
import Auth     from './hoc/auth';
import RegUser  from './containers/admin/register';
import Logout   from './components/admin/logout';

const Routes = () => {
    return (
        <Layout>
            <Switch>
                <Route path="/" exact component={Auth(Home, null)} />
                <Route path="/book/:id" exact component={Auth(BookView, null)} />
                <Route path="/login" exact component={Auth(Login, false)} />
                <Route path="/user" exact component={Auth(User, true)} />
                <Route path="/user/add" exact component={Auth(AddRev, true)} />
                <Route path="/user/register" exact component={Auth(RegUser, true)} />
                <Route path="/user/reviews" exact component={Auth(UserRev, true)} />
                <Route path="/user/edit-post/:id" exact component={Auth(EditRev, true)} />
                <Route path="/user/logout" exact component={Auth(Logout, true)} />
            </Switch>
        </Layout>
    );
};

export default Routes;