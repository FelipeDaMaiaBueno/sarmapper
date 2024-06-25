import React from 'react';
import './subscribe.css';

export default class Subscribe extends React.Component {
  constructor() {
    super();
    this.state = {
      email: ''
    };
  }
  handleEmailChange(value) {
    this.setState({
      email: value
    });
  }
  render() {
    return <div className="subscribe-section">
      <div className="subscribe-section__cta">{`E-mail para contato.`}</div>
      <div className="subscribe-section__cta"><h3>{`pedro.pierdona@bm.pr.gov.br`}</h3></div>
    </div>
  }
}
