"use strict";

(function(){

    window.onload = function(){
        var handler = function(e){
                alert(e.target.firstChild.data);
            },
            data = [
                {title: 'Item 1'},
                {title: 'Item 2'},
                {title: 'Item 3', disabled: true, handler: handler},
                {title: 'Item 4'},
                {title: 'Click Me!', handler: handler},
                {title: 'Item 5', submenu: [
                    {title: 'Item 5-1'},
                    {title: 'Item 5-2'},
                    {title: 'Item 5-3'},
                    {title: 'Item 5-4'},
                    {title: 'Item 5-5'},
                    {title: 'Item 5-6'},
                    {title: 'Item 5-7', disabled: true},
                    {title: 'Click Me Too! 2', handler: handler},
                    {title: 'Item 5-8', submenu: [
                        {title: 'Item 5-8-1'},
                        {title: 'Item 5-8-2', disabled: true},
                        {title: 'Item 5-8-3', submenu: [
                            {title: 'Item 5-8-3-1'},
                            {title: 'Item 5-8-3-2', disabled: true},
                            {title: 'Item 5-8-3-3'},
                            {title: 'Item 5-8-3-4'}
                        ]},
                        {title: 'Item 5-8-4'}
                    ]},
                    {title: 'Item 5-9'}
                ]},
                {title: 'Item 6', disabled: true},
                {title: 'Item 7'}
            ],

            button1 = document.getElementById(1),
            button2 = document.getElementById(2),
            button3 = document.getElementById(3),
            button4 = document.getElementById(4),

            menu1 = new Menu(data, false),
            menu2 = new Menu(data, false),
            menu3 = new Menu(data, false),
            menu4 = new Menu(data, false);

        menu1.attachTo(button1);
        menu2.attachTo(button2);
        menu3.attachTo(button3);
        menu4.attachTo(button4);
    };

})();


