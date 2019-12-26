import React, { PureComponent } from 'react';


export default class extends PureComponent {
  render() {
    console.log('this.props', this.props);
    return (
      <>{this.renderContent()}</>
    );
  }

  renderContent = () => {
    return (
      <div style={{ backgroundColor: 'white', height: '100%', textAlign: 'center' }}>
        <h1>TabBar Index Content</h1>
      </div>
    );
  };
}
