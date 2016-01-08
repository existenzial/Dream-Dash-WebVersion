Game = {

    score: 0,
    orientated: false

};

var gameOptions = {
    playSound: true,
    playMusic: true
};

Boot = function(game) {};

Boot.prototype = {

    init: function() {

        this.input.maxPointers = 1;
        this.stage.disableVisibilityChange = true;

        if (this.game.device.desktop) {
            this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.game.scale.setMinMax(400, 300, 800, 600);
            this.game.scale.pageAlignHorizontally = true;
            this.game.scale.pageAlignVertically = true;
            this.game.scale.updateLayout(true);

        } else { // for all mobile
            this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.game.scale.setMinMax(480, 260, 1400, 1050);
            this.game.scale.pageAlignHorizontally = true;
            this.game.scale.pageAlignVertically = true;
            this.game.scale.forceOrientation(true, false);
            this.game.scale.setResizeCallback(this.gameResized, this);
            this.game.scale.enterIncorrectOrientation.add(this.enterIncorrectOrientation, this);
            this.game.scale.leaveIncorrectOrientation.add(this.leaveIncorrectOrientation, this);
            this.game.scale.updateLayout(true);
        }

        // this block centers game on screen
        // outer width, parseInt needs a string argument, returns integer for outer width
        var ow = parseInt(this.game.canvas.style.width, 10);
        // - 60 makes up for height lost in navbar at top
        var oh = parseInt(this.game.canvas.style.height, 10) - 60; // outer height
        var r = Math.max(window.innerWidth / ow, window.innerHeight / oh);
        // max ratio between (inner and outer width; inner and outer height)
        var nw = ow * r; // new width; outer width * ratio
        var nh = oh * r; // new height
        this.game.canvas.style.width = nw + 'px'; // set new width
        this.game.canvas.style.height = nh + 'px';
        // console.log("style", this.game.canvas.style.marginLeft)
        this.game.canvas.style.marginLeft = (window.innerWidth / 2 - nw / 2) + 'px';
        this.game.canvas.style.marginTop = (window.innerHeight / 2 - nh / 2) + 'px';
        document.getElementById('game').style.width = window.innerWidth + 'px';
        // - 60 makes up for height lost in navbar at top
        document.getElementById('game').style.height = window.innerHeight - 1 - 60 + 'px';
        //css for body includes 1px top margin that we want to eliminate
        document.getElementById('game').style.overflow = 'hidden';
    },

    preload: function(game) {

        //  Here we load the assets required for our preloader
        if (window.deviceAssetSize === 'desktop') {
            game.load.image('loading-bg', 'assets/images/2.png');
        } else if (window.deviceAssetSize === '1024x768') {
            game.load.image('loading-bg', 'assets/images/2_1024x768.png');
        } else if (window.deviceAssetSize === '960x640') {
            game.load.image('loading-bg', 'assets/images/2_960x640.png');
        } else if (window.deviceAssetSize === '1280x800') {
            game.load.image('loading-bg', 'assets/images/2_1280x800.png');
        } else if (window.deviceAssetSize === '1024x600') {
            game.load.image('loading-bg', 'assets/images/2_1024x600.png');
        } else if (window.deviceAssetSize === '1408x792') {
            game.load.image('loading-bg', 'assets/images/2_1408x792.png');
        }

        game.load.image('loading', 'assets/images/loading.png');
        game.load.image('brand', 'assets/images/Boulder.png');

        game.load.script('WebFont', 'vendor/webfontloader.js');
        game.load.script('MainMenu', 'src/MainMenu.js');

    },

    create: function(game) {

        game.state.start('Directions');

    },

    enterIncorrectOrientation: function() {
        Game.orientated = false;
        document.getElementById('orientation').style.display = 'block';
    },

    leaveIncorrectOrientation: function() {
        Game.orientated = true;
        document.getElementById('orientation').style.display = 'none';
    }
};