import React, { Component } from 'react';
import { Widget, addResponseMessage, addLinkSnippet, addUserMessage } from 'react-chat-widget';

import './styles.css';

import logo from './JarvisNew.png';
import tick from './tick.png';
import loading from './loadchat.gif';
import beep from './beep.mp3';
import { setTimeout } from 'timers';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            response: []
        };
    }

    componentDidMount() {
        //addResponseMessage("Welcome to Nelson, I'm Jarvis. How may i help you today");
        this.openChat();
        this.startResponse();
        this.setBtnSend();
    }

    handleNewUserMessage = (newMessage) => {
        console.log(`New message incomig! ${newMessage}`);
    }

    openChat = () => {
        document.getElementsByClassName("rcw-launcher")[0].click();
        document.getElementsByClassName("rcw-launcher")[0].style.display = "none";
    }

    setBtnSend =() => {
        setTimeout(function () {
            document.getElementsByClassName("rcw-send")[0].addEventListener('click', function () {
                var node = document.getElementById("node").value;
                var sessionId = document.getElementById("sessionId").value;
                var message = document.getElementsByClassName("rcw-new-message")[0].value;
                var app = new App;
                app.fetchResponse(message, node, sessionId);
            });
        },2000)
    }

    startResponse = () => {
        var url = "http://askme.a2hosted.com/home/startchat";
        url = "http://localhost:53648/home/startchat";
        var footer = document.getElementsByClassName("suggestionFooter")[0];
        console.log({ loading });
        if (footer != null) {
            footer.style.display = "block";
        }

        fetch(url)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        response: result
                    });
                    addResponseMessage(result.response)
                    document.getElementById("node").value = result.node;
                    document.getElementById("sessionId").value = result.sessionId;
                    console.log("node:" + result.node);
                    var suggestList = '';
                    result.suggest.forEach(function (item) {
                        suggestList = suggestList + '<div class="suggestionItem">' + item + '</div>';
                    });
                    document.getElementById("suggestionBody").innerHTML = suggestList;
                    document.getElementsByClassName("suggestionFooter")[0].style.display = "none";
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }



    fetchResponse = (message, node, sessionId) => {
        var url = "http://askme.a2hosted.com/home/chat?message=" + message + "&node=" + node + "&sessionId=" + sessionId;
        url = "http://localhost:53648/home/chat?message=" + message + "&node=" + node + "&sessionId=" + sessionId;
        var footer = document.getElementsByClassName("suggestionFooter")[0];
        console.log({ loading });
        if (footer != null) {
            footer.style.display = "block";
        }

        fetch(url)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        response: result
                    });
                    addResponseMessage(result.response)
                    document.getElementById("node").value = result.node;
                    console.log("node:" + result.node);
                    var suggestList = '';
                    result.suggest.forEach(function (item) {
                        suggestList = suggestList + '<div class="suggestionItem">'+item+ '</div>' ;
                    });
                    document.getElementById("suggestionBody").innerHTML = suggestList;
                    document.getElementsByClassName("suggestionFooter")[0].style.display = "none";
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }


    render() {
        return (
            <div className="App">    
                <Widget
                    handleNewUserMessage={this.handleNewUserMessage}
                    profileAvatar={logo}
                    title="ChaT Bot ai"
                    subtitle="TCS Chat Product"
                    toggleChat={true}
                    showChat={true}
                    launch={true}
                    customLauncher={true}
                />
                <div id="suggestion" className="suggestionBox" >
                    <div class="suggestionheader">Suggestion: <img src={tick} /></div> <hr />
                    <div id="suggestionBody">Suggestion: </div>
                    <div class="suggestionFooter"><img src={loading} /></div> <hr/>
                    <div className="usefulLinkheader">
                        <span>Useful Links:</span><a href="http://askme.a2hosted.com/home/Admin" className="usefulLinks">Admin</a>
                    </div>
                </div>
                <input type="hidden" id="node" value="0" />
                <input type="hidden" id="sessionId" value="0" />
            </div>
        );
    }


}

export default App;