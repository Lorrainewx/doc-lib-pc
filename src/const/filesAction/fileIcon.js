import excel from '@/assets/previewIcon/excel.svg';
import ppt from '@/assets/previewIcon/ppt.svg';
import word from '@/assets/previewIcon/word.svg';
import pdf from '@/assets/previewIcon/pdf.svg';
import img from '@/assets/previewIcon/image.svg';
import unKnown from '@/assets/previewIcon/folder.svg';


export const fileType = {
    PDF: ['pdf'],
    DOC: ['doc','docx'],
    PPT: ['ppt', 'pptx'],
    EXCEL: ['xlsx','xls'], //'xlt','xltx','csv','xlsb','xlsm','xltm','xml','xlam','xla','prn','dif','slk'
    IMG: ['bmp', 'jpg', 'png', 'gif'],    
}

export const fileIcon = {
    PDF: pdf,
    DOC: word,
    PPT: ppt,
    EXCEL: excel,
    IMG: img,
    UNKNOWN: unKnown,
}


