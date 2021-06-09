import React from "react";
import { Redirect, Route } from "react-router-dom";
const renderMergedProps = (component : any, ...rest : any) => {
    const finalProps = Object.assign({}, ...rest);
    return React.createElement(component, finalProps);
};
// Private routing for secured paths
const ProtectedRoute = ({ component, ...rest } : any ) => {
    return (
        <Route
            {...rest}
            render={(props) => {
                return localStorage.getItem("id") 
                ?
                (
                    renderMergedProps(component, props, rest)
                ) 
                :
                (
                    <Redirect
                        to={{
                            pathname: "/",
                            state: { from: props.location },
                        }}
                    />
                );
            }}
        />
    );
};

export default ProtectedRoute;