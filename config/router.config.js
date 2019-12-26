export default [
  // SEARCH
  {
    path: '/search',
    component: '../layouts/BlankLayout',
    authority: ['user', 'admin'],
    routes: [      
      { path: '/search', component: './search/index', title: '搜索' },
    ],
  },
  // PAGE
  {
    path: '/',
    component: '../layouts/BasicLayout',
    Routes: ['src/pages/Authorized'],
    authority: ['user', 'admin'],
    routes: [
      { path: '/', component: './home/index', title: '文档库' },
      { path: '/myfile', component: './myFile/index', title: '文件列表' },
      { path: '/myfavorate', component: './myFavorate/index', title: '星标文件' },
      { path: '/recent', component: './recent/index', title: '最近使用' },
      { path: '/exception/403', component: './exception/403', title: 'not-permission' },
      { path: '/exception/404', component: './exception/404', title: 'not-find' },
      { path: '/exception/500', component: './exception/500', title: 'server-error' },
      { path: '/404', component: '404' },
    ],
  },  
];
