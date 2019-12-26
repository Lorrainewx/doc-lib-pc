import React, { PureComponent } from 'react';


export default class extends PureComponent {
  render() {
    return (
      <>{this.renderContent()}</>
    );
  }

  renderContent = () => {
    return (
      <div style={{ backgroundColor: 'white', height: '100%', textAlign: 'center' }}>
        <h1>TabBar Koubei Content</h1>
      </div>
    );
  };
}
