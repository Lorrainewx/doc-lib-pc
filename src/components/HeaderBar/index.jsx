import React, { Component } from 'react';
import { Input, Icon } from 'antd';
import router from 'umi/router';
import Link from 'umi/link';
import creatHistory from 'history/createHashHistory';
import CONST_VALUE from '@/const/index.js';
import styles from './index.less';

const history = creatHistory();
const { PROJECTNAME, PAGE_TYPE } = CONST_VALUE;

const { Search } = Input;

class HeaderBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchWords: ''
    }
  }
  gotoSearch = () => {
    router.push('/search');
  }
  confirmSearch = val => {
    this.setState({
      searchWords: val
    })
    const { onSearch } = this.props;
    onSearch && onSearch(val);
  }
  gotoHistory = () => {
    history.goBack();
  }
  render() {
      const { isGotoSearch, pageType } = this.props;
    return (
        <>
          <div className={styles.headerWrapper}>
            {
              pageType == PAGE_TYPE.SEARCH 
              ? <div className={styles.titleB} onClick={() => this.gotoHistory()}>
                  <Icon type="left" />
                  <span>返回首页</span>
                  {/* <Link to={`/`}>返回首页</Link> */}
                </div>
              : <span className={styles.title}>{PROJECTNAME}</span>
            }              
              {isGotoSearch 
              ? <div className={styles.search} onClick={this.gotoSearch.bind(this)}><Icon type="search" /><span>文件、文件夹</span></div>
              : <Search
                  placeholder="文件、文件夹"
                  onSearch={value => this.confirmSearch(value)}
                  style={{ width: 253 }}
              />}        
          </div>
        </>
    );
  }
}

export default HeaderBar;
