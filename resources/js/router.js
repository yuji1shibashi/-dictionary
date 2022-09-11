import { createRouter, createWebHistory } from 'vue-router'

// ルーティング設定
const router = createRouter({
    history: createWebHistory(),
    routes : [
        {
            // ログアウト処理
            path: '/logout',
            name: 'logout',
            component: require('./components/auth/LogoutComponent.vue').default,
        },
        {
            // ログイン画面
            path: '/login',
            name: 'login',
            component: require('./components/auth/LoginComponent.vue').default,
            meta: { guestOnly: true }
        },
        {
            // ユーザー登録画面
            path: '/create_user',
            name: 'create_user',
            component: require('./components/auth/CreateUserComponent.vue').default,
            meta: { guestOnly: true }
        },
        {
            // 辞書検索画面
            path: '/dictionary',
            name: 'dictionary',
            component: require('./components/dictionary/IndexComponent.vue').default,
            meta: { authOnly: true }
        },
        {
            // 暗記テスト画面
            path: '/memorization',
            name: 'memorization',
            component: require('./components/memorization/IndexComponent.vue').default,
            meta: { authOnly: true }
        },
        {
            // 辞書検索画面
            path: '/:pathMatch(.*)',
            name: 'dictionary',
            component: require('./components/dictionary/IndexComponent.vue').default,
            meta: { authOnly: true }
        },
    ]
});

/**
 * 認証状況をチェック
 *
 * @return {boolean}
 */
function isAuth() {
    return Boolean(parseInt(localStorage.getItem("isAuth"), 10));
}

/**
 * 認証状況で画面遷移先を変える
 */
router.beforeEach((to, from, next) => {

    // 認証済みのみの場合
    if (to.matched.some(record => record.meta.authOnly)) {
        // 認証が完了していない場合はログイン画面に遷移する。
        if (!isAuth()) {
            next("/login");
        } else {
            next();
        }

    // 認証待ちのみの場合
    } else if (to.matched.some(record => record.meta.guestOnly)) {
        // 認証が完了している場合は単語翻訳画面に遷移する。
        if (isAuth()) {
            next("/dictionary");
        } else {
            next();
        }

    // どちらも可能な場合
    } else {
        next();
    }
});

export default router;