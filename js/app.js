(function () {
    "use strict";

    window.App = {
        currentScene: null,
        sceneInit:null,
        scenes: {},
        initialize: function () {
            $$legend.show()
            // start navigation
            this.setEvents();
            $$nav.on();
        },
        setEvents: function () {
            var self = this;

             $(document.body).on({
                'nav_key:red': function () {
                    history.back()                 
                } 
            });  

            $(document.body).on({
                'nav_key:green': function () {
                    location.reload()
                    $$log(SB, "nav")
                } 
            });
			
			
            // click on menu item
            $('.menu').on('click', '.menu-item', function ( e ) {
                var scene = e.currentTarget.getAttribute('data-content');
                self.showContent(scene);
            });

            $('.menu-item:eq(0)').click()

        },
        showContent: function(scene){
            var cur = this.currentScene,
                newScene = this.scenes[scene];

            if ( cur !== newScene ) {
                if ( !newScene ) {
                    $$error('Scene ' + scene + ' doesn\'t exist');
                } else {
                    if ( cur ) {
                        cur.hide();
                    }
                    newScene.show();
                    this.currentScene = newScene;
                }
            }
        }
    };

    SB(_.bind(App.initialize, App));
})();
