"use strict";

(function(){

    window.onload = function(){
        var handler = function(e){
                alert(e.target.firstChild.data);
            },
            data = [
                {title: 'First Item'},
                {title: 'Second Item'},
                {title: 'Wont click me :(', disabled: true, handler: handler},
                {title: 'Fourth Item'},
                {title: 'Click Me!', handler: handler},
                {title: 'Seventh Item', submenu: [
                    {title: '1st Submenu'},
                    {title: '2nd Submenu', disabled: true},
                    {title: 'Click Me Too! 2', handler: handler},
                    {title: '4th Submenu', submenu: [
                        {title: '41st Submenu'},
                        {title: '42nd Submenu', disabled: true},
                        {title: '43rd Submenu', submenu: [
                            {title: '41st Submenu'},
                            {title: '42nd Submenu', disabled: true},
                            {title: '43rd Submenu'},
                            {title: '44th Submenu'}
                        ]},
                        {title: '44th Submenu'}
                    ]},
                    {title: 'gggggggggg3rd Submenu'}
                ]},
                {title: 'Eightth Item'},
                {title: 'Nineth Item'}
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

