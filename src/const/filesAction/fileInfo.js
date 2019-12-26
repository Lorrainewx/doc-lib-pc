import CONST_VALUE from '@/const/index.js';
const { FILE_TYPE } = CONST_VALUE;

const DDfile = {
    // 文件名
    getFileName() {
        return this['fileName'];
    },
    // 文件夹判断
    isFolder() {
      return this['type'] === FILE_TYPE.FOLDER;
    },
    // 文件后缀
    getFileExtension() {
        let extension = "";
        const name = this.getFileName() || "";
        if (!this.isFolder()) {
            const dotIndex = name.lastIndexOf('.');
            if (dotIndex >= 0) {
                extension = name.substring(dotIndex + 1);
            }
        }
        return extension;
    },
    // 文件小写化
    getLowerCaseExt() {
        return this.getFileExtension().toLowerCase();
    },
    // 文件预览
    DDCanPreview() {
        const ddSupportFiles = ['doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'pdf', 'jpg', 'jpeg', 'png', 'gif'];
        return ddSupportFiles.includes(this.getLowerCaseExt());
    },
    // 星标文档
    inMyFavorite() {
        if(this['inMyFavorite']=='1') {
            return true;
        }
        return false;        
    }
}

export default function DDFILE(file) {
    const fileInfo = {
      ...DDfile,
      ...file
    };
    return fileInfo;
}


