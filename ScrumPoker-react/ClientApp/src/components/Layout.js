import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { NavMenu } from './NavMenu';

export class Layout extends Component {
    static displayName = Layout.name;
    render() {
        return (
            <html lang="en">
            <head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Scrum Poker: Showdown</title>
                <link rel="stylesheet" href="../custom.css"/>
            </head>
            <body>
            <main role="main">
                <div>
                    <NavMenu />
                    <Container>
                        {this.props.children}
                    </Container>
                </div>
            </main>
            </body>
            </html>
        );    
    }
}