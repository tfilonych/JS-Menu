"use strict";

(function() {
    function Element(tag){
        this.tag = tag;
        this.el = document.createElement(this.tag);
    }

    Element.prototype.addClass = function(cls){
        var classes,
            currentClass = this.el.getAttribute('class');

        if (currentClass){
            classes = currentClass.split(' ');
            if (classes.indexOf(cls) === -1){
                classes.push(cls);
            }
            this.el.setAttribute('class', classes.join(' '));
        } else {
            this.el.setAttribute('class', cls);
        }
    };

    Element.prototype.removeClass = function(cls){
        var classes,
            index,
            currentClass = this.el.getAttribute('class');

        if (currentClass){
            classes = currentClass.split(' ');
            index = classes.indexOf(cls);
            if (index > -1){
                classes.splice(index, 1);
            }
            this.el.setAttribute('class', classes.join(' '));
        }
    };

    Element.prototype.setText = function(text){
        var textNode = document.createTextNode(text);

        this.el.appendChild(textNode);
    };

    Element.prototype.appendChild = function(el){
        var element = el.el || el;

        this.el.appendChild(element);
    };

    Element.prototype.onClick = function(handler){
        this.el.addEventListener('click', handler);
    };

    Element.prototype.onMouseover = function(handler){
        this.el.addEventListener('mouseover', handler);
    };

    Element.prototype.getHeight = function(){
        var rect = this.el.getBoundingClientRect();

        return rect.height;
    };

    Element.prototype.isParentFor = function(elm){
        var element = elm.el || elm;

        while (element.parentNode){
            if (element == this.el){
                return true;
            }
            element = element.parentNode;
        }
        return false;
    };

    window.Element = Element;
})();