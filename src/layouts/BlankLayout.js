import React, { PureComponent } from 'react';
import withRouter from 'umi/withRouter';
import Authorized from '@/utils/Authorized';
import Exception403 from '@/pages/exception/403';
import pathToRegexp from 'path-to-regexp';
import { connect } from 'dva';
import styles from './index.less';

let currHref = '';

class BlankLayout extends PureComponent {
  getRouterAuthority = (pathname, routeData) => {
    let routeAuthority = ['noAuthority'];
    const getAuthority = (key, routes) => {
      routes.map(route => {
        if (route.path && pathToRegexp(route.path).test(key)) {
          routeAuthority = route.authority;
        } else if (route.routes) {
          routeAuthority = getAuthority(key, route.routes);
        }
        return route;
      });
      return routeAuthority;
    };
    return getAuthority(pathname, routeData);
  };

  render() {
    const {
      children,
      loading,
      location: { pathname },
      route: { routes },
    } = this.props;
    const routerConfig = this.getRouterAuthority(pathname, routes);
    const { href } = window.location; // 浏览器地址栏中地址
    if (currHref !== href) {
      if (!loading.global) {
        currHref = href; // 将新页面的 href 值赋值给 currHref
      }
    }

    return (
        <div key={pathname} style={{ position: 'absolute', width: '100%', height: '100%' }}>
          <Authorized authority={routerConfig} noMatch={<Exception403 />}>
            {children}
          </Authorized>
        </div>
    );
  }
}

export default withRouter(connect(({ app, loading }) => ({ app, loading }))(BlankLayout));
