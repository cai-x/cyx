export default {
    path: "/film",
    component: () =>
        import ('@/views/Film/Film'),
    redirect: '/film/NowPlaying',
    children: [{
            path: "/film/NowPlaying",
            component: () =>
                import ('@/views/Film/NowPlaying')
        },
        {
            path: "/film/ComingSoon",
            component: () =>
                import ('@/views/Film/ComingSoon')
        }
    ]
}