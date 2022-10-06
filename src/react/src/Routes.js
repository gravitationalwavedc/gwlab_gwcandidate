import React from 'react';
import {Route} from 'found';
import Loading from './Components/Loading';
import HomePage from './Pages/HomePage';

const handleRender = ({Component, props}) => {
    if (!Component || !props)
        return <Loading/>;

    // if (!harnessApi.hasAuthToken())
    //     throw new RedirectException('/auth/?next=' + props.match.location.pathname);
  
    return <Component data={props} {...props}/>;
};

function getRoutes() {
    return (
        <Route>
            <Route
                Component={HomePage}
                render={handleRender}/>
        </Route>
    );
}

export default getRoutes;
