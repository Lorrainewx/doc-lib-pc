import React, { Component } from 'react';
import { Message } from 'antd';
import { connect } from 'dva';
import CONST_VALUE from '@/const/index.js';
import FileList from '@/components/FileList';
import { fileType, fileIcon } from '@/const/filesAction/fileIcon.js';
import { RESULT_STATUS } from '@/const/filesAction/status.js';
import { unitConversion, timeFormat } from '@/utils/utils.js';
import styles from './index.less';

const { PAGE_TYPE } = CONST_VALUE;


@connect(({ file, loading }) => ({
  file,
  loading: loading.effects['file/focus']
}))
class MyStar extends Component {
  constructor(props) {
    super(props);  
    this.state = {
      params: { time: new Date().getTime() },
      pageNum: 0,
      pageSize: 10,
    }
  }
  componentDidMount() {
    this.queryMyFavorate();
  }
   // 换页
   handlePageChange = (pagenum, pageSize) => {
    const { params } = this.state;
    this.queryMyFavorate({ ...params, pageNum: pagenum - 1, pageSize, });
    this.setState({ pageSize, pageNum: pagenum - 1 });
  }
  queryMyFavorate = params => {
    const { dispatch } = this.props;
    const { pageNum, pageSize } = this.state;
    dispatch({
      type: 'file/focus',
      payload: {
        pageSize,
        pageNum,
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
    const { file: { focusResult }, loading } = this.props;
    let { errorcode, data } = focusResult;
    const { params, pageNum, pageSize } = this.state;
    const isSuccess = errorcode==RESULT_STATUS.SUCCESS;

    return (
      <div className={styles.content}>
        {isSuccess &&
        <FileList 
          dataSource={data.list} 
          pageType={PAGE_TYPE.STAR}
          loading={loading}
          pagination={{            
              total: Number(data.totalNumber),
              // current: Number(pages),
              pageSize: 10,
              onChange: this.handlePageChange,
              onShowSizeChange: this.handlePageChange
          }}
          onQuery={() => this.queryMyFavorate({ ...params, pageNum, pageSize, time: new Date().getTime() })}
        />
        }
      </div>
    );
  }
}

export default MyStar;
