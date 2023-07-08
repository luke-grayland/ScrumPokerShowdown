import React from 'react';
import { Container } from 'reactstrap';
import NavMenu from "./NavMenu";

const Layout = (props) => {
    return (
        <main role="main">
            <NavMenu />
            <Container>
                {props.children}
            </Container>
        </main>
    );
}

export default Layout;
