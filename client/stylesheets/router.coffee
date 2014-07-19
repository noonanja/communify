IronRouterProgress.configure
    enabled : false

Router.map ->
    @route 'home',
        path     : '/'
        progress :
            enabled : true