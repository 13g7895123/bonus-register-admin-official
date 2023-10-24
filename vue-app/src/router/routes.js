const routes = [
    {
        path: "/",
        name: 'Home',
        component: () => import('../views/Home.vue'),
        children: [
            { path: "/player", name: 'player', component: () => import('../views/PlayerUser.vue')},
            { path: "/player/add", name: 'addPlayer', component: () => import('../views/PlayerUserAdd.vue')},
            { path: "/player/edit/:id", name: 'editPlayer', component: () => import('../views/PlayerUserEdit.vue')},
            { path: "/server", component: () => import('../views/Server.vue')},
            { path: "/server/add", name: 'addServer', component: () => import('../views/ServerAdd.vue')},
            { path: "/server/edit/:id", name: 'editServer', component: () => import('../views/ServerEdit.vue')},
            { path: "/server/editBgImg/:id", name: 'editServerBgImg', component: () => import('../views/ServerBgImg.vue')},
            { path: "/systemUser", component: () => import('../views/SystemUser.vue')},
            { path: "/systemUser/add", name: 'addSystemUser', component: () => import('../views/SystemUserAdd.vue')},
            { path: "/systemUser/edit/:id", name: 'editSystemUser', component: () => import('../views/SystemUserEdit.vue')},
            { path: "/systemUser/editMsg/:id", name: 'editSystemUserMsg', component: () => import('../views/SystemUserMsgEdit.vue')},
            { path: "/systemAdmin", component: () => import('../views/SystemAdmin.vue')},
            { path: "/systemAdmin/add", name: 'addSystemAdmin', component: () => import('../views/SystemAdminAdd.vue')},
            { path: "/systemAdmin/edit/:id", name: 'editSystemAdmin', component: () => import('../views/SystemAdminEdit.vue')},
        ]
    },
    {
        path: "/login",
        name: 'Login',
        component: () => import('../views/Login.vue'),
    },
    {
        path: '/:catchAll(.*)',
        name: '404',
        component: () => import('../views/404.vue')
    }
]

export default routes