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
      <div className="subscribe-section__cta">{`Atualmente a base de dados do ISRID coleta dados de países da América do Norte, 
      Europa, África e Oceania. Além da necessidade de aumentar coleta estatística para fornecer informações mais precisas, 
      é necessário considerar que fatores como vegetação influenciam no poder de deslocamento da vítima. Caso você tenha maneiras para 
      melhorarmos a adaptação desta ferramenta, entre em contato com `}<b>{`pedro.pierdona@bm.pr.gov.br`}</b></div>
      <div className="subscribe-section__cta">{`2º Ten. QOBM Pedro Arthur `}<b>{`Pierdoná`}</b></div>
    </div>
  }
}
