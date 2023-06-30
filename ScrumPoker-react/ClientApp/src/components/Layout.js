import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { NavMenu } from './NavMenu';

export class Layout extends Component {
    static displayName = Layout.name;
    render() {
        return (
            <main role="main">
                <div>
                    <NavMenu />
                    <Container>
                        {this.props.children}
                    </Container>
                </div>
            </main>
        );    
    }
}