import React, { PureComponent } from 'react';
import withRouter from 'umi/withRouter';
import Link from 'umi/link';
import { Layout, Menu, Icon, Message } from 'antd';
import { isEmpty } from 'lodash';
import HeaderBar from '@/components/HeaderBar';
import Authorized from '@/utils/Authorized';
import Exception403 from '@/pages/exception/403';
import pathToRegexp from 'path-to-regexp';
import { connect } from 'dva';
import CONST_VALUE from '@/const/index.js';
import { RESULT_STATUS } from '@/const/filesAction/status.js';
import { channels, enterpriseLibrary } from '@/const/mock/list.js';
import styles from './index.less';

let currHref = '';
const { Header, Sider, Content } = Layout;
const { IMAGE_RESOURSE } = CONST_VALUE;


class BasicLayout extends PureComponent {
  constructor(props) {
    super(props);
    const { location: { pathname, query: { fileId } } } = props;    
    const currentUrl = pathname.replace("/", "");
    this.state = {
      currentChannel: currentUrl || "",
      currentDoc: fileId || "",
    }
  }
  componentDidMount() { // 初始化
    this.queryDoclibs(); 
  }
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
  
  changeChannel = e => {  // 选择频道
    this.setState({
      currentChannel: e.key,
      currentDoc: "",
    });
  };

  changeDoc = e => {  // 选择文档库
    this.setState({
      currentDoc: e.key,
      currentChannel: "",
    })
  }
  // 查询用户所在文档库
  queryDoclibs = () => {
    const { dispatch, location: { pathname } } = this.props;
    dispatch({
      type: 'file/doclib',
      callback: res => {
        const { data } = res;
        const currentDoc = data.departments[0].folderId;
        const currentName = data.departments[0].name;
        const isHome = pathname == '/';
        isHome && this.setState({ currentDoc });        
        isHome && this.props.history.push(`/?fileId=${currentDoc}`);
      }
    })
  }

  render() {
    const { currentDoc } = this.state;
    const {
      children,
      loading,
      location: { pathname, query: { fileId } },
      route: { routes },
      file 
    } = this.props;
    const { doclibResult } = file;
    let { errorcode, message } = doclibResult;
    const { data } = doclibResult;
    const routerConfig = this.getRouterAuthority(pathname, routes);
    const { href } = window.location; // 浏览器地址栏中地址
    if (currHref !== href) {
      if (!loading.global) {
        currHref = href; // 将新页面的 href 值赋值给 currHref
      }
    }
    return (
        <div key={pathname}>
          <Authorized authority={routerConfig} noMatch={<Exception403 />}>
            <Layout>
              <Header>
                <HeaderBar isGotoSearch={true} />
              </Header>
              <Layout>
                <Sider>
                  <div className={styles.wrapper}>            
                    <div className={styles.channels}>
                      <Menu key={1} onClick={this.changeChannel} selectedKeys={[this.state.currentChannel]} mode="vertical">
                        {channels.map(item => {
                          return (
                            <Menu.Item key={item.key}>
                              <Icon type={item.icon} /> 
                              <Link to={item.url}>{item.title}</Link>               
                            </Menu.Item>
                          )
                        })}
                      </Menu>
                    </div>

                    {/* 组织文档库 */}
                    <div className={styles.docLibrary}>
                      <div className={styles.doctitle}>单位/组织文档库</div>
                      <Menu key={2} onClick={this.changeDoc} selectedKeys={[currentDoc]} mode="vertical">
                        {errorcode==RESULT_STATUS.SUCCESS && 
                        data.departments.map(item => {
                          return (
                            <Menu.Item key={item.folderId}>
                              <img src={(item.folderId==currentDoc) && currentDoc!=""
                                        ? IMAGE_RESOURSE.ORGANIZATION_HIGHLIGHT 
                                        : IMAGE_RESOURSE.ENTERPRICE}
                              /> 
                              <Link to={`/?fileId=${item.folderId}`}>
                                {item.name}
                              </Link>      
                            </Menu.Item>
                          )
                        })}
                      </Menu>
                    </div>
                  </div>
                </Sider>
                <Content>
                  {children}                  
                </Content>
              </Layout>
            </Layout>
          </Authorized>
        </div>
    );
  }
}

export default withRouter(connect(({ file, loading }) => ({ file, loading }))(BasicLayout));
