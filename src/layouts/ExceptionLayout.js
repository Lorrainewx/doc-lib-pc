import React, { PureComponent } from 'react';

class ExceptionLayout extends PureComponent {
  render() {
    const { children } = this.props;

    return <div>{children}</div>;
  }
}

export default ExceptionLayout;
