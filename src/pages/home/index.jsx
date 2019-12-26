import React, { Component } from 'react';
import { Breadcrumb, Message } from 'antd';
import Link from 'umi/link';
import { connect } from 'dva';
import { isEmpty } from 'lodash';
import PageLoading from '@/components/PageLoading';
import HeaderBar from '@/components/HeaderBar';
import FileList from '@/components/FileList';
import CONST_VALUE from '@/const/index.js';
import { channels } from '@/const/mock/list.js';
import styles from './index.less';
import { RESULT_STATUS } from '@/const/filesAction/status';

const { PAGE_TYPE, FILE_TYPE } = CONST_VALUE;

@connect(({ file, loading }) => ({
  file,
  loading: loading.effects['file/myFile'] && loading.effects['file/path']
}))
class Home extends Component {
  constructor(props) {
    super(props); 
    this.config = {
      pageType: PAGE_TYPE.DOCLIB,
    }
    this.state = {
      doc_org_name: '',// 文档库名
      // 默认参数
      params: {},
      fileId: null,
      pageNum: 0, 
      pageSize: 10,
      shouldLoading: true,
      shouldPathLoading: true,
    }
  }
  componentWillReceiveProps(nextprops) {
    let { location: { query: { fileId, fileName } } } = nextprops; 
    if(fileId != this.state.fileId) {
      this.setState({ shouldPathLoading: false, shouldLoading: false });
      fileId && this.getData(fileId, fileName);
    }
  }
  componentDidMount() {    
    let { location: { query: { fileId, fileName } } } = this.props; 
    fileId && this.getData(fileId, fileName);
  }
  getData = (fileId, fileName) => {
    const params = {
      id: fileId,
      fileType: FILE_TYPE.FOLDER, 
    }; 
    this.queryFolderList(params);
    this.queryBreadList(fileId);
    this.setState({ fileId, doc_org_name: decodeURI(decodeURI(fileName)) });
  }
  // 文件夹列表
  queryFolderList = params => {
    const { dispatch } = this.props;
    const { pageNum, pageSize } = this.state;
    dispatch({
      type: 'file/myFile',
      payload: {
        pageNum,
        pageSize,
        ...params
      } ,
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
    const { doc_org_name, fileId, shouldLoading, shouldPathLoading } = this.state;
    const { file, loading, location } = this.props;
    const { query } = location;
    let { 
      filesResult,
      pathResult
    } = file;
    const { 
      errorcode, 
      message, 
      data: filesData       
    } = filesResult;
    const { 
      errorcode: pathcode,
      message: pathMessage, 
      data: pathData,
    } = pathResult;
    
    const isSuccess = errorcode==RESULT_STATUS.SUCCESS;
    const isPathSuccess = pathcode==RESULT_STATUS.SUCCESS;

    let pathArr_reverse = [];
    isPathSuccess &&
    pathData.fileArr.map(item => {
      pathArr_reverse.unshift({...item});
    })
    
    return (     
      <>
      {
      !loading && shouldLoading && shouldPathLoading &&
      <div className={styles.content}>
        <Breadcrumb separator=">">
          { isPathSuccess &&     
            pathArr_reverse.map((item, index) => {
              return <Breadcrumb.Item key={index}>
                      <Link to={`${item.fileId==pathArr_reverse[0].fileId
                                  ? '/?fileId=' + item.fileId 
                                  : '/myFile?fileId='+ item.fileId}`}>{item.fileName}
                      </Link>
                     </Breadcrumb.Item>
            })
          } 
        </Breadcrumb>
        {/* 文档库列表 */}
        {isSuccess &&
        <FileList
          loading={loading}
          dataSource={filesData.fileArr}
          fileId={fileId}
          pageType={this.config.pageType}
          docName={doc_org_name}
          pagination={false}
        />}
      </div>}
      </>
    );
  }
}

export default Home;
