import React, { Component } from 'react';
import { Breadcrumb, Message } from 'antd';
import { connect } from 'dva';
import Link from 'umi/link';
import PageLoading from '@/components/PageLoading';
import HeaderBar from '@/components/HeaderBar';
import FileList from '@/components/FileList';
import CONST_VALUE from '@/const/index.js';
import { RESULT_STATUS } from '@/const/filesAction/status.js';
import styles from './index.less';

const { PAGE_TYPE, FILE_TYPE } = CONST_VALUE;


@connect(({ file, loading }) => ({
  file,
  loading: loading.effects['file/myFile'] && loading.effects['file/path']
}))
class MYFile extends Component {
  constructor(props) {
    super(props);  
    this.state = {
      // 根据path字段拼
      belong_org: '西湖区公安局', // 文档库名
      folder_name: '会议纪要', // 文件名
      fileId: null,  // 当前FileID
      params: {},
      pageSize: 10,
      pageNum: 0,
      shouldLoading: true,
      shouldPathLoading: true,
    }
  }
  componentWillReceiveProps(nextprops) {
    const { location: { query: { fileId } } } = nextprops;
    if(fileId != this.state.fileId) {
      this.setState({ shouldLoading: false, shouldPathLoading: false });
      this.getData(fileId);
    }
  }
  componentDidMount() {
    const { location: { query: { fileId } } } = this.props;
    this.getData(fileId);    
  }
  getData = fileId => {
    const params = {
      id: fileId,
      fileType: FILE_TYPE.ALL,
    }; 
    this.queryFileList(params);
    this.queryBreadList(fileId);
    this.setState({ fileId });
  }
  // 换页
  handlePageChange = (pagenum, pageSize) => {
    const { params } = this.state;
    this.queryFileList({ ...params, pageNum: pagenum - 1, pageSize, });
    this.setState({ pageSize, pageNum: pagenum - 1 });
  }
  // 文件列表
  queryFileList = params => {
    const { dispatch } = this.props;
    const { pageNum, pageSize } = this.state;
    dispatch({
      type: 'file/myFile',
      payload: {
        pageNum,
        pageSize,
        ...params,
        time: new Date().getTime()
      },
      callback: res => {
        const { errorcode, message } = res;
        if(errorcode != RESULT_STATUS.SUCCESS) {
          Message.error(message);
        }        
        this.setState({ shouldLoading: true });
      }  
    }) 
    this.setState({ params });
  }
  // 文件路径（面包屑）
  queryBreadList = fileId => {
    const { dispatch } = this.props;
    dispatch({
      type: 'file/path',
      payload: {
        fileId
      },
      callback: res => {
        const { errorcode, message } = res;
        if(errorcode != RESULT_STATUS.SUCCESS) {
          Message.error(message);
        }
        this.setState({ shouldPathLoading: true });
      }      
    })
  }
  render() {
    const { folder_name, belong_org, fileId, params, pageSize, pageNum, shouldLoading, shouldPathLoading } = this.state;
    const { file, loading } = this.props;
    let { 
      filesResult,
      pathResult
    } = file;
    let { errorcode, data: filesData } = filesResult;
    let { errorcode: pathcode, data: pathData, } = pathResult;

    const isSuccess = errorcode==RESULT_STATUS.SUCCESS;
    const isPathSuccess = pathcode==RESULT_STATUS.SUCCESS;

    let pathArr_reverse = [];
    isPathSuccess &&
    pathData.fileArr.map(item => {
      pathArr_reverse.unshift({...item});
    })
    return (   
      <> 
      { !loading && shouldPathLoading && shouldLoading && 
      <div className={styles.content}>
        {/* 面包屑 path拼接 */}
        <Breadcrumb separator=">">
          { isPathSuccess &&     
            pathArr_reverse.map((item, index) => {
              return <Breadcrumb.Item key={index}>
                {
                  item.fileId!=pathArr_reverse[pathArr_reverse.length-1].fileId 
                  ? <Link to={`${item.fileId==pathArr_reverse[0].fileId
                    ? '/?fileId=' + item.fileId 
                    : '/myFile?fileId='+ item.fileId}`}>{item.fileName}
                    </Link>
                  : <span>{item.fileName}</span>
                }
                </Breadcrumb.Item>
            })
          } 
        </Breadcrumb>
        {/* 文件列表 */}
        {isSuccess && 
        <FileList
          dataSource={filesData.fileArr}
          loading={loading}
          fileId={fileId}
          pageType={PAGE_TYPE.MYFILE}
          pagination={{
            total: Number(filesData.totalNumber),
            current: Number(pageNum)+1,
						pageSize: 10,
						onChange: this.handlePageChange,
            onShowSizeChange: this.handlePageChange
          }}
          onQuery={() => this.queryFileList({...params, pageNum, pageSize})}
        />
        }
      </div>
      }
      </>
    );
  }
}

export default MYFile;
