"use strict";

(function(){
    function Menu(data, isSubmenu) {
        this.data = data;
        this.items = [];
        this.isSubmenu = isSubmenu;
        this.build();
    }

    Menu.prototype.build = function() {
        this.menu = new Element('div');

        if (this.isSubmenu){
            this.menu.addClass('context-sub-menu');
        } else {
            this.menu.addClass('context-menu');
        }

        this.scrollUp = this.createScrollButton('top');
        this.menu.appendChild(this.scrollUp);

        this.itemsWrapper = new Element('div');
        this.itemsWrapper.addClass('items-wrapper');
        this.menu.appendChild(this.itemsWrapper);

        for (var i = 0; i < this.data.length; i++){
            var item = new Item(this.data[i]);
            this.itemsWrapper.appendChild(item.el);
            this.items.push(item);
        }
        this.scrollDown = this.createScrollButton('bottom');
        this.menu.appendChild(this.scrollDown);
        //this.hideScrolls();
        if (!this.isSubmenu){
            document.body.appendChild(this.menu.el);
        }
        this.menu.addClass('hidden');
        document.body.addEventListener('click', this.hide.bind(this));
        this.scrollDown.onClick(this.moveItemsUp.bind(this));
        this.scrollUp.onClick(this.moveItemsDown.bind(this));

    };

    Menu.prototype.createScrollButton = function(position){
        var button = new Element('div'),
            caret = new Element('span');

        button.addClass('context-scroll scroll-' + position);
        caret.addClass('caret caret-' + position);
        button.appendChild(caret);
        return button;
    };

    Menu.prototype.attachTo = function(element){
        this.target = element;
        this.target.addEventListener('click', this.show.bind(this));
    };

    Menu.prototype.hide = function(e){
        var target = (e && e.target) || (event && event.srcElement);

        if (target != this.target){
            if (!this.menu.isParentFor(target) && !this.areItemsParentsOf(target)){
                this.menu.addClass('hidden');
            }
        }
    };

    Menu.prototype.areItemsParentsOf = function(element){
        var submenu,
            i;

        for (i = 0; i < this.items.length; i++){
            submenu = this.items[i].submenu;
            if (submenu){
                if (submenu.menu.isParentFor(element)){
                    return true;
                } else {
                    return submenu.areItemsParentsOf(element);
                }

            }
        }
        return false;
    };

    Menu.prototype.show = function(){
        if (this.target){
            this.setDesiredPositionRelativelyTo(this.target);
        }
        this.menu.removeClass('hidden');
    };

    Menu.prototype.setDesiredPositionRelativelyTo = function(node){
        var element = node.el || node,
            windowWidth = window.innerWidth,
            hwindowHeight = window.innerHeight,
            menuRect = this.menu.el.getBoundingClientRect(),
            targetRect = element.getBoundingClientRect();

        if (targetRect.right + menuRect.width < windowWidth){
            this.menu.el.style.left = targetRect.right + 'px';
        } else {
            this.menu.el.style.left = (targetRect.left - menuRect.width) + 'px';
        }
        if (targetRect.top + menuRect.height < hwindowHeight){
            this.menu.el.style.top = targetRect.top + 'px';
        } else {
            this.menu.el.style.top = (targetRect.bottom - menuRect.height) + 'px';
        }
    };

    Menu.prototype.hideScrolls = function(){
        this.scrollUp.addClass('hidden');
        this.scrollDown.addClass('hidden');
    };

    Menu.prototype.showScrolls = function(){
        this.scrollUp.removeClass('hidden');
        this.scrollDown.removeClass('hidden');
    };

    Menu.prototype.moveItemsUp = function(){
        var itemHeight = this.items[0].el.getHeight(),
            wrapperRect = this.itemsWrapper.el.getBoundingClientRect(),
            menuRect = this.menu.el.getBoundingClientRect(),
            relativeTop = menuRect.top - wrapperRect.top;

        this.itemsWrapper.el.style.top = (-relativeTop - itemHeight) + 'px';
    };

    Menu.prototype.moveItemsDown = function(){
        var itemHeight = this.items[0].el.getHeight(),
            wrapperRect = this.itemsWrapper.el.getBoundingClientRect(),
            menuRect = this.menu.el.getBoundingClientRect(),
            relativeTop = menuRect.top - wrapperRect.top;

        this.itemsWrapper.el.style.top = (-relativeTop + itemHeight) + 'px';
    };

    window.Menu = Menu;

})();
