(function () {
    "use strict";
    var _inited;

    window.App.scenes.channels2 = {
        init: function () {
            this.$el = $('.channels2');
            this.$el.on('click', '.tile ', this.onItemClick);
            //this.$el.on('click', '.overlay', this.onItemCloseClick);

            //this.renderItems(App.videos);

            _inited = true;
        },

        show: function () {
            if (!_inited) {
                this.init();
            }

            this.$el.show();
        },

        hide: function () {
            this.$el.hide();
        },

        onItemClick: function (e) {
            var $overlay=$(".overlay");
            $overlay.show();
            $$nav.save();
             var url = e.currentTarget.getAttribute('data-url');
            Player.play({
             url: url
             });
        }

    }
})();
