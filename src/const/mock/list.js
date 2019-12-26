import CONST_VALUE from '../index.js';
const { IMAGE_RESOURSE } = CONST_VALUE;
// 频道
export const channels = [
    {
      title: '最近使用',
      icon: "clock-circle",
      url: '/recent',
      key: 'recent'
    },
    {
      title: '星标文档',
      icon: "star",
      url: '/myfavorate',
      key: 'myfavorate'
    },
  ];

// 组织文档库
export const enterpriseLibrary = [
    {
        'fileId': 0,
        'fileName': '西湖区公安局',
        'fileType': 'folder',
    },{
        'fileId': 2,
        'fileName': '灵隐街道派出所',
        'fileType': 'folder',
    },{
        'fileId': 1,
        'fileName': '文新街道派出所',
        'fileType': 'folder',
    },{
        'fileId': 3,
        'fileName': '五常街道派出所',
        'fileType': 'folder',
    },{
        'fileId': 4,
        'fileName': '蒋村街道派出所',
        'fileType': 'folder',
    }
]

// 区公安分局文档库
export const districtLibrary = [
    {
        'fileId': 0,
        'fileName': '会议纪要',
        'fileType': 'folder',
        'fileSize': 1009092,
        'modifyTime': 1576122439295, 
        'sort': 0,
    },
    {
        'fileId': 1,
        'fileName': '汇报材料',
        'fileType': 'folder',
        'fileSize': 1009092,
        'modifyTime': 1576122439295, 
        'sort': 1,
    },
    {
        'fileId': 2,
        'fileName': '党建专栏',
        'fileType': 'folder',
        'fileSize': 1009092,
        'modifyTime': 1576122439295, 
        'sort': 2,
    },
    {
        'fileId': 3,
        'fileName': '基层调研',
        'fileType': 'folder',
        'fileSize': 1009092,
        'modifyTime': 1576122439295, 
        'sort': 3,
    },
    {
        'fileId': 4,
        'fileName': '领导讲话',
        'fileType': 'folder',
        'fileSize': 1009092,
        'modifyTime': 1576122439295, 
        'sort': 4,
    }
]

// 区公安分局文档库文档列表
export const ownerFileList = [
    {
        'fileId': 0,
        'fileName': '文件夹',
        'fileType': 'folder',   
        'fileSize': 1009092,
        'modifyTime': 1576122439295,         
        'sort': 0,     
    },{
        'fileId': 1,
        'fileName': '文件夹',
        'fileType': 'folder',
        'fileSize': 1009092,
        'modifyTime': 1576122439295, 
        'sort': 1,
    },{
        'fileId': 2,
        'fileName': '政务服务满意度调研会议.xls',
        'fileType': 'file',
        'suffix': 'xls',
        'isfavorate': true,
        'fileSize': 1009092,
        'modifyTime': 1576122439295, 
        'sort': 2,
    },{
        'fileId': 3,
        'fileName': '政务服务满意度调研会议.ppt',
        'fileType': 'file',
        'suffix': 'ppt',
        'fileSize': 1009092,
        'modifyTime': 1576122439295, 
        'sort': 3,
    },{
        'fileId': 4,
        'fileName': '政务服务满意度调研会议.doc',
        'fileType': 'file',
        'suffix': 'doc',
        'fileSize': 1009092,
        'modifyTime': 1576122439295, 
        'sort': 4,
    },{
        'fileId': 5,
        'fileName': '政务服务满意度调研会议.ppt',
        'fileType': 'file',
        'suffix': 'ppt',
        'fileSize': 1009092,
        'modifyTime': 1576122439295, 
        'sort': 5,
    },{
        'fileId': 6,
        'fileName': '政务服务满意度调研会议.doc',
        'fileType': 'file',
        'suffix': 'doc',
        'fileSize': 1009092,
        'modifyTime': 1576122439295, 
        'sort': 6,
    }
]


// 搜索结果
export const searchResult = [
    {
        'fileId': '0',
        'searchwords': '材料',
        'fileName': '第一次会议汇报材料',
        'filePath': '西湖区公安分局/文件夹一',
        'fileType': 'folder',
        'fileSize': 29378,
        'mtime': 1576122439, 
        'sort': 0,
    }, {
        'fileId': '1',
        'searchwords': '材料',
        'fileName': '执法执勤用车审批材料.xls',
        'filePath': '文新街道派出所/文件夹二/文件夹三',
        'suffix': 'xls',
        'fileType': 'file',
        'fileSize': 29378,
        'mtime': 1576122439, 
        'sort': 1,
    }, {
        'fileId': '2',
        'searchwords': '材料',
        'fileName': '公务员调出业务材料汇总.ppt',
        'filePath': '灵隐街道派出所/行政处文件夹',
        'suffix': 'ppt',
        'fileType': 'file',
        'fileSize': 29378,
        'mtime': 157612243, 
        'sort': 2,
    }, {
        'fileId': '3',
        'searchwords': '材料',
        'fileName': '政务数字证书申请材料.doc',
        'filePath': '灵隐街道派出所/文件夹一',
        'suffix': 'doc',
        'fileType': 'file',
        'fileSize': 29378,
        'mtime': 1576122439, 
        'sort': 3,
    }
]


// 星标文件
export const favorateData = [
    {
        'fileId': '1',
        'searchwords': '材料',
        'fileName': '执法执勤用车审批材料.xls',
        'filePath': '文新街道派出所/文件夹二/文件夹三',
        'suffix': 'xls',
        'fileType': 'file',
        'isfavorate': true,
        'fileSize': 1009092,
        'modifyTime': 1576122439295, 
        'sort': 1,
    }, {
        'fileId': '2',
        'searchwords': '材料',
        'fileName': '公务员调出业务材料汇总.ppt',
        'filePath': '灵隐街道派出所/行政处文件夹',
        'suffix': 'ppt',
        'fileType': 'file',
        'isfavorate': true,
        'fileSize': 1009092,
        'modifyTime': 1576122439295, 
        'sort': 2,
    }, {
        'fileId': '3',
        'searchwords': '材料',
        'fileName': '政务数字证书申请材料.doc',
        'filePath': '灵隐街道派出所/文件夹一',
        'suffix': 'doc',
        'fileType': 'file',
        'isfavorate': true,
        'fileSize': 1009092,
        'modifyTime': 1576122439295, 
        'sort': 3,
    }, {
        'fileId': '4',
        'searchwords': '材料',
        'fileName': '政务数字证书申请材料.doc',
        'filePath': '灵隐街道派出所/文件夹一',
        'suffix': 'doc',
        'fileType': 'file',
        'isfavorate': true,
        'fileSize': 1009092,
        'modifyTime': 1576122439295, 
        'sort': 4,
    }, {
        'fileId': '5',
        'searchwords': '材料',
        'fileName': '政务数字证书申请材料.doc',
        'filePath': '灵隐街道派出所/文件夹一',
        'suffix': 'doc',
        'fileType': 'file',
        'isfavorate': true,
        'fileSize': 1009092,
        'modifyTime': 1576122439295, 
        'sort': 5,
    }, {
        'fileId': '6',
        'searchwords': '材料',
        'fileName': '满意度调研会议.xls',
        'filePath': '灵隐街道派出所/文件夹一',
        'suffix': 'xls',
        'fileType': 'file',
        'isfavorate': true,
        'fileSize': 1009092,
        'modifyTime': 1576122439295, 
        'sort': 6,
    }, {
        'fileId': '7',
        'searchwords': '材料',
        'fileName': '政务数字证书申请材料.ppt',
        'filePath': '灵隐街道派出所/文件夹一',
        'suffix': 'ppt',
        'fileType': 'file',
        'isfavorate': true,
        'fileSize': 1009092,
        'modifyTime': 1576122439295, 
        'sort': 7,
    }
]