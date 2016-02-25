"use strict";

(function() {
    function Item(data){
        this.data = data;
        this.el = new Element('div');

        if (this.data.disabled){
            this.el.addClass('disabled');
        }
        this.el.setText(this.data.title);

        if (this.data.submenu){
            var caret = new Element('span');
            caret.addClass('caret caret-right');
            this.el.appendChild(caret);
            this.submenu = new Menu(this.data.submenu, true);

            document.body.appendChild(this.submenu.menu.el);
        }
        if (this.data.handler && !this.data.disabled){
            this.el.onClick(this.data.handler);
        }
        this.el.onMouseover(this.showSubmenu.bind(this));
    };

    Item.prototype.showSubmenu = function(){
        if (this.submenu){
            this.submenu.setDesiredPositionRelativelyTo(this.el);
            this.submenu.show();
        }
    };

    window.Item = Item;
})();