import React, { Component } from 'react';
import { Layout, Icon } from 'antd';
import Link from 'umi/link';
import HeaderBar from '@/components/HeaderBar';
import FileList from '@/components/FileList';
import CONST_VALUE from '@/const/index.js';
import { searchResult } from '@/const/mock/list.js';
import styles from './index.less';

const { Header, Content } = Layout;
const { PAGE_TYPE, IMAGE_RESOURSE } = CONST_VALUE;
class Search extends Component {
  constructor(props) {
    super(props);  
    this.state = {
      searchContent: '',
    }
  }
  searchBywords = val => {
    // todo...
    this.setState({ searchContent: val });
  }
  render() {
    const { searchContent } = this.state;
    return (
      <Layout>
        <Header>
          <HeaderBar onSearch={val => this.searchBywords(val)} pageType={PAGE_TYPE.SEARCH} />
        </Header>
        <Layout>          
          <Content>
            <div className={styles.content}>
              {
                searchContent !== '' &&
                <FileList
                  dataSource={searchResult}
                  pagination={false}
                  keywords="材料"
                  pageType={PAGE_TYPE.SEARCH}
                />
              }
              {
                searchContent == '' &&
                <div className={styles.nofiles}><img src={IMAGE_RESOURSE.EMPTY}  /><span>糟糕！！！无搜索结果</span></div>
              }
            </div>
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default Search;
