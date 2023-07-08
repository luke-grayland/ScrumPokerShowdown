import React from 'react';

const Layout = (props) => {
    return (
        <main role="main">
            {props.children}
        </main>
    );
}

export default Layout;
