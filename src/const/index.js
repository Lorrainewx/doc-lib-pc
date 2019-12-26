import enterprice from '@/assets/enterprice.svg';
import folder from '@/assets/folder.svg';
import fileTemp from '@/assets/file_temp.png';
import recent from '@/assets/recent.svg';
import favorate from '@/assets/favorate.svg';
import star_sm from '@/assets/star_sm.svg';
import star_white from '@/assets/star_white.svg';
import star from '@/assets/star.png';
import toast from '@/assets/toast.svg';
import organization from '@/assets/organization.png';
import organization_h from '@/assets/org_highlight.svg';
import star_pc from '@/assets/star_pc.svg';
import recent_pc from '@/assets/recent_pc.svg';
import download from '@/assets/download.png';
import empty from '@/assets/empty.png';

const CONST_VALUE = {
    FILE_TYPE: {
        ALL: 0,
        FILE: 1,   // 文件
        FOLDER: 2,   // 文件夹
        DOCLIB: 'doc_library',  // 文档库
        DOCLIBFOLDER: 'doc_lib_folder', // 文档库夹
    },
    IMAGE_RESOURSE: {   // 图片资源
        ENTERPRICE: enterprice,
        FOLDER: folder,
        FILETEMP: fileTemp,
        RECENT: recent,
        FAVORATE: favorate,
        STARSM: star_sm,
        STAR_WHITE: star_white,
        STAR: star,
        TOAST: toast,
        ORGANIZATION: organization,
        ORGANIZATION_HIGHLIGHT: organization_h,
        STARPC: star_pc,
        RECENTPC: recent_pc,
        DOWNLOAD: download,
        EMPTY: empty,
    },
    PAGE_TYPE: {    // 页面类型
        DOCLIB: 'document_library', // 文档库 
        DOCLIBFOLDER: 'document_lib_folder', 
        STAR: 'star',   // 星标
        RECENT: 'recent',   // 最近使用
        SEARCH: 'search',   // 搜索栏目
        MYFILE: 'myfile'    // 文件列表        
    },
    PROJECTNAME: '文档库'  
  }
  
  export default CONST_VALUE;