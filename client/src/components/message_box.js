import React, { Component } from 'react';

export default class MessageBox extends Component{
  constructor(props){
    super(props)
  }
  renderList() {
    return this.props.messages.map((data) => {
      if (data.numUsers){
        var message = "there are " + data.numUsers + " participants";
        if(data.numUsers == 1){
          message = "there is 1 participant";
        }
        return (
          <li key={data.timestamp} className="message notice">
            <span className="messageBody">{message}</span>
          </li>
        )
      }else{
        return (
          <li key={data.timestamp} className="message">
            <span className="username">{data.username}</span>
            <span className="messageBody">{data.message}</span>
          </li>
        )
      }
    });
  }
  render() {
    return (
      <ul className="messages">
        {this.renderList()}
      </ul>
    );
  }
}
