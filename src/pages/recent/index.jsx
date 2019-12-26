import React, { Component } from 'react';
import { Table, Breadcrumb, Message } from 'antd';
import { connect } from 'dva';
import HeaderBar from '@/components/HeaderBar';
import FileList from '@/components/FileList';
import CONST_VALUE from '@/const/index.js';
import styles from './index.less';
import { RESULT_STATUS } from '@/const/filesAction/status';

const { PAGE_TYPE, FILE_TYPE } = CONST_VALUE;

@connect(({ file, loading }) => ({
  file,
  loading: loading.effects['file/recent']
}))
class Recent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      params: {},
      pageNum: 0,
      pageSize: 10,
    }
  } 
  componentDidMount() {
    this.queryRecentList();
  }
  // 换页
  handlePageChange = (pagenum, pageSize) => {
    const { params } = this.state;
    this.queryRecentList({ ...params, pageNum: pagenum - 1, pageSize, });
    this.setState({ pageSize, pageNum: pagenum - 1 });
  }
  queryRecentList(params) {
    const { dispatch } = this.props;
    const { pageNum, pageSize } = this.state;
    dispatch({
      type: 'file/recent',
      payload: {
        pageNum,
        pageSize,
        ...params,  
      },
      callback: res => {
        const { errorcode, message } = res;
        if(errorcode != RESULT_STATUS.SUCCESS) {
          Message.error(message);
        }
      }  
    })
    this.setState({ params });
  }
  render() {
    const { file, loading } = this.props;
    const { recentResult } = file;
    const { errorcode, data } = recentResult;
    const { pageNum, pageSize, params } = this.state;
    const isSuccess = errorcode == RESULT_STATUS.SUCCESS;

    return (
      <div className={styles.content}>            
          {isSuccess && 
          <FileList 
            loading={loading}
            columns={this.columns} 
            dataSource={data.files} 
            pagination={{
              total: Number(data.totalNumber),
              current: Number(pageNum+1),
              pageSize: 10,
              onChange: this.handlePageChange,
              onShowSizeChange: this.handlePageChange
            }}
            pageType={PAGE_TYPE.RECENT}
            onQuery={() => this.queryRecentList({ ...params, pageNum, pageSize, time: new Date().getTime() })}
          />
          }
      </div>
    );
  }
}

export default Recent;
