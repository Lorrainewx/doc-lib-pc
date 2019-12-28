import { recentList, focusedList, toggleFocus, libsList, fileList, getFilePath } from '@/services/file';
import { getLibsList } from '@/services/jsapiFile';

export default {
    namespace: 'file',
    state: {
        recentResult: {},
        filesResult: {},
        focusResult: {},
        doclibResult: {},
        pathResult: {},
        result: {},
        libsResult: {}, // jsapi的文档列表
    },
    effects: {
        // 获取最近使用列表
        *recent({ callback, payload }, { call, put }) {
            let response = yield call(recentList, payload);
            response = response.errorcode==0 ? response : { errorcode: response.errorcode, message: response.message };
            yield put({
                type: 'save',
                payload: {
                    recentResult: response
                },
            });
            callback && callback(response);
        },
        // 获取文件列表
        *myFile({ callback, payload }, { call, put }) {
            let response = yield call(fileList, payload);     
            response = response.errorcode==0 ? response : { errorcode: response.errorcode, message: response.message };       
            yield put({
                type: 'save',
                payload: {
                    filesResult: response
                }
            })
            callback && callback(response);
        },
        // 星标文件
        *focus({ callback, payload },{ call, put }) {
            let response = yield call(focusedList, payload);       
            response = response.errorcode==0 ? response : { errorcode: response.errorcode, message: response.message };      
            yield put({
                type: 'save',
                payload: {
                    focusResult: response
                }
            })
            callback && callback(response);
        },      
        // 星标切换  
        *focusToggle({ callback, payload },{ call, put }) {
            let response = yield call(toggleFocus, payload);   
            response = response.errorcode==0 ? response : { errorcode: response.errorcode, message: response.message }; 
            yield put({
                type: 'save',
                payload: {
                    result: response
                }
            })
            callback && callback(response);
        },
        // 文件库列表
        *doclib({ callback, payload },{ call, put }) {
            let response = yield call(libsList, payload);
            response = response.errorcode==0 ? response : { errorcode: response.errorcode, message: response.message }; 
            yield put({
                type: 'save',
                payload: {
                    doclibResult: response
                }
            })
            callback && callback(response);
        },
        *path({ callback, payload },{ call, put }) {
            let response = yield call(getFilePath, payload);
            response = response.errorcode==0 ? response : { errorcode: response.errorcode, message: response.message }; 
            yield put({
                type: 'save',
                payload: {
                    pathResult: response
                }
            })
            callback && callback(response);
        },
        // JSAPI libs请求
        *getLibs({ callback, payload }, { call, put }) {
            let response = yield call(getLibsList, payload);
            yield put({
                type: 'save',
                payload: {
                    libsResult: response
                }
            })
            callback && callback(response);
        }
    },
    reducers: {
        save(state, action) {
            return {
                ...state,
                ...action.payload
            };
        },
    }
}