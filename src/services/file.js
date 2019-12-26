import request from '@/utils/request';
import { stringify } from 'qs';
import { baseRequest } from '@/utils/jsapiRequest';
console.log('baseRequest');
console.log(baseRequest);



// 最近 文档列表
export async function recentList(params) {
  return request(`/api/file/recently?${stringify(params)}`);
}

// 星标 文档列表
export async function focusedList(params) {
    return request(`/api/file/focused?${stringify(params)}`);
}

// 星标 转换
export async function toggleFocus(params) {
    return request(`/api/file/focus?fileId=${params.fileId}&starMark=${params.starMark}`, {
        method: 'PUT',
        body: params.userIds,
    });
}

// 文档库 列表
export async function libsList() {
    return request(`/api/file/libs`);
}

//  文档列表
export async function fileList(params) {
    return request(`/api/file/${params.id}/files?${stringify(params)}`);
}

// 查询文件路径
export async function getFilePath(params) {
    return request(`/api/file/path?${stringify(params)}`);
}



