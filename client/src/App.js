import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import openSocket from 'socket.io-client';
import MessageBox from './components/message_box';
const  socket = openSocket('http://localhost:8000');



class App extends Component {
  constructor(props){
    super(props);
    this.state = { username : '',  currentPage : 'login', message:'', messages:[]};

    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onMessageSubmit = this.onMessageSubmit.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.onMessageChange = this.onMessageChange.bind(this);

    socket.on('login', (data) => {
      var message = "Welcome to Socket.IO Chat – ";
      console.log(data);
    });
    socket.on('new message', (data) => {
      // addChatMessage(data);
      console.log(data);
      this.state.messages.push(data);
      this.setState({messages:this.state.messages});
    });
    socket.on('user joined', (data) => {
      
      this.state.messages.push(data);
      this.setState({messages:this.state.messages});
    });
    socket.on('user left', (data) => {

      this.state.messages.push(data);
      this.setState({messages:this.state.messages});
    });
    socket.on('typing', (data) => {
      // addChatTyping(data);
    });
    socket.on('stop typing', (data) => {
      // removeChatTyping(data);
    });
    socket.on('disconnect', () => {
      console.log('you have been disconnected');
    });
    socket.on('reconnect', () => {
      console.log('you have been reconnected');
      if (this.state.username) {
        socket.emit('add user', this.state.username);
      }
    });
    socket.on('reconnect_error', () => {
      console.log('attempt to reconnect has failed');
    });
  }
  onInputChange(event){
    this.setState({username: event.target.value});
  }
  onMessageChange(event){
    this.setState({message: event.target.value});
  }
  onFormSubmit(event){
    event.preventDefault();
    socket.emit('add user', this.state.username);
    this.setState({ currentPage: 'chat'});
  }
  onMessageSubmit(event){
    event.preventDefault();
    socket.emit('new message', this.state.message);
    console.log(this.state.message);
    this.setState({ message: ''});

  }
  addParticipantsMessage = (data) => {
    var message = '';
    if (data.numUsers === 1) {
      message += "there's 1 participant";
    } else {
      message += "there are " + data.numUsers + " participants";
    }
    console.log(message);
  }
  addChatMessage = (data, options) => {

  }




  render() {
    return (
      <div className="App">
        <ul className="pages">
          <li className={"chat page " + (this.state.currentPage == 'chat' ? 'visible' : 'invisible')}>
            <div className="chatArea">
                <MessageBox messages={this.state.messages} />
            </div>
            <form onSubmit={this.onMessageSubmit}>
              <input className="inputMessage" placeholder="Type here..."
              onChange={this.onMessageChange}
              value={this.state.message}
              />
            </form>
          </li>
          <li className={"login page "+ (this.state.currentPage == 'login' ? 'visible' : 'invisible')}>
            <div className="form">
              <h3 className="title">What's your nickname? This is the timer value: {this.state.timestamp}</h3>

              <form onSubmit={this.onFormSubmit}>
              <input
              className="usernameInput" type="text" maxLength="14"
              onChange={this.onInputChange}
              />
              </form>
            </div>
          </li>
        </ul>
      </div>
    );
  }
}

export default App;
