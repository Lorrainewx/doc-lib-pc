import React, { Component } from 'react';
import { List, Table, Icon, Tooltip, Message } from 'antd';
import { connect } from 'dva';
import router from 'umi/router';
import { unitConversion, timeFormat, keywordsColorful, showHtml } from '@/utils/utils.js';
import CONST_VALUE from '@/const/index.js';
import { fileType, fileIcon } from '@/const/filesAction/fileIcon.js';
import DDFILE from '@/const/filesAction/fileInfo';
import styles from './index.less';
import { RESULT_STATUS } from '@/const/filesAction/status';

const { IMAGE_RESOURSE, PAGE_TYPE, FILE_TYPE } = CONST_VALUE;

@connect(({ file }) => ({
  file
}))
class FileList extends Component {
  constructor(props) {
    super(props);  
    this.state = {
      // 默认参数
      params: {},
      fileId: 0,
      pageNum: 0, 
      pageSize: 10,
    }   
  }
  // download = file => {  // 下载
  //   console.log('下载文件', file);
  // }
  collection = file => {  // 星标
    const { dispatch, onQuery } = this.props;
    dispatch({
      type: 'file/focusToggle',
      payload: {
        fileId: file.fileId,
        starMark: !Number(file.inMyFavorite),
        userIds: ["2605"],  // 用户ids 暂定,
        time: new Date().getTime() //解决浏览器请求缓存 
      },
      callback: res => {
        const { data, errorcode, message } = res;
        if(errorcode == RESULT_STATUS.SUCCESS) { // 标星成功
          Message.config({ top: '30%' });
          Message.success(`${!Number(file.inMyFavorite) ?'收藏成功' : '取消收藏'}`);
          // 加载数据
          onQuery && onQuery();
        }else {
          Message.error(message);
        }
      }
    })
  }
  openFile = (e, record) => {  // 预览、打开文件
    const { docName } = this.props;
    const isFolder = record.type == FILE_TYPE.FOLDER;
    e.preventDefault();
    isFolder && router.push(`/myfile?fileId=${record.fileId}`);  //打开文件夹
    !isFolder && console.log('文件'); // 预览文件
  }
  openFileBelongFolder = (e, fileId) => {
    e.preventDefault();
    console.log(fileId);  // 打开文件所在为位置 请求path路径接口
  }
  columns = [
    {
      title: '名称',
      dataIndex: 'fileName',
      render: (name, record) => {
        // 文档
        let icon = null;
        {
            for(let key in fileType) {
              const suffix = DDFILE(record).getFileExtension();
              if(suffix && fileType[key].includes(suffix)) {
                icon = fileIcon[key];
              }
            }
        }
        return (
          <div onClick={e => this.openFile(e, record)}>
            {/* 文件夹、文件 */}
            <img src={record.type == FILE_TYPE.FOLDER || this.props.pageType === PAGE_TYPE.DOCLIB 
                      ? IMAGE_RESOURSE.FILETEMP 
                      : icon || fileIcon['UNKNOWN']
                      } 
                style={{ width: '15px',  
                         marginRight: '12px', 
                         position: 'relative', 
                         top: '-2px' 
                       }} 
              />
              {/* 搜索关键词高亮 */}
              { this.props.pageType === PAGE_TYPE.SEARCH
                ? showHtml(keywordsColorful(name, this.props.keywords))
                // : record.fileType === FILE_TYPE.FOLDER || this.props.pageType === PAGE_TYPE.DOCLIB
                : name
                // : <Tooltip placement="bottomLeft" title={<>暂时无法预览该文件，请下载后<br/> 用其他应用打开</>}> {/*不支持预览的文件提示*/}
                //     {name}
                //   </Tooltip>
              }
          </div>
        )
      }
    },
    {
      title: '大小',
      dataIndex: 'fileSize',
      render: size => {
        return <>{unitConversion(size)}</>
      }
    },
    // 搜索频道无最后更新
    {
      title: '最后更新',
      dataIndex: 'mtime',
      render: (mtime, record) => {
        return <>{timeFormat(mtime||record.ctime)}</>
      }
    },
    // 最近使用频道
    {
      title: '最近访问',
      dataIndex: 'recentTime',
      render: ( rtime, record ) => {
        return <>{timeFormat(rtime||record.mtime)}</>
      }
    },
    // 打开文件位置
    { 
      title: '',
      dataIndex: 'openPath',
      render: (_, record) => {
        return <div onClick={e => this.openFileBelongFolder(record.fileId)}>前往文件所在位置</div>
      }
    },    
    // 搜索/首页频道无相关操作    
    {
      title: '',
      dataIndex: 'action',
      width: 130,
      render: (_, record) => {
        return (
          <>
            {/* 文档库频道、文件夹无下载操作 */}
            {/* { !(this.props.pageType === PAGE_TYPE.DOCLIB) && (record.type == FILE_TYPE.FILE) 
              ? <img src={IMAGE_RESOURSE.DOWNLOAD} 
                     className={styles.download} 
                     key={0} 
                     onClick={e => this.download(record)} 
                /> 
              : null} */}
            {/* 星标操作 */}
            <div className={`${ this.props.pageType === PAGE_TYPE.STAR ? styles.starChannel : record.inMyFavorite!='0' ? styles.hasStar : styles.star }`} 
                 onClick={e => this.collection(record)}>
              {
                record.type != FILE_TYPE.FILE
                ? null
                : record.inMyFavorite!='0'
                ? <Icon key={2} type="star" theme="filled" />
                : <Icon key={1} type="star" />
              }
            </div>          
          </>
        )
      }
    }
  ]
  render() {
    let { pagination, pageType, loading, dataSource } = this.props;
    dataSource = dataSource || [];
    const data_new =  dataSource.map((item, index) => {
      return { ...item, key: index }
    })
    let columns;
    switch(pageType) {
      case PAGE_TYPE.SEARCH:
        columns = this.columns.filter(item => item.dataIndex!=='mtime' && item.dataIndex!=='action'); 
        break;   
      case PAGE_TYPE.DOCLIB:
      case PAGE_TYPE.MYFILE:    
      case PAGE_TYPE.STAR:
        columns = this.columns.filter(item => item.dataIndex!=='recentTime' && item.dataIndex!=='openPath'); 
        break;
      case PAGE_TYPE.RECENT:    
        columns = this.columns.filter(item => item.dataIndex!=='mtime' && item.dataIndex!=='openPath');
    }
    return (
        <Table 
            loading={loading}
            columns={columns} 
            dataSource={data_new} 
            pagination={pagination}
            scroll={{ x: true }}
            locale={{emptyText: '暂无数据' }}
        />
    );
  }
}

export default FileList;
