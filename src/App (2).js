import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
    render() {
        return (
            <div>
                <Header />
                <Content />
                <Footer />
            </div>
        );
    }
}

class Header extends React.Component {
    render() {
        return (
            <div className="headerBot">
                <span>ChaTBot.ai</span>
            </div>
        );
    }
}
class Content extends React.Component {
    render() {
        return (
            <div>
                <h2>Content</h2>
                <p>The content text!!!</p>
            </div>
        );
    }
}


class Footer extends React.Component {
    render() {
        return (
            <div className="footer">
                <input type="text" id="chatMessage" />
                <button type="button" > </button>
            </div>
        );
    }
}


export default App;
