import { baseRequest } from '@/utils/jsapiRequest';


// 文档库列表
export async function getLibsList(params) {
    const reqBody = await baseRequest('/govdoc/files/library', params);
    return reqBody;
}