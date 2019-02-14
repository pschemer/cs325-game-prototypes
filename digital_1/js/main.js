"use strict";

window.onload = function() {
    // You can copy-and-paste the code from any of the examples at http://examples.phaser.io here.
    // You will need to change the fourth parameter to "new Phaser.Game()" from
    // 'phaser-example' to 'game', which is the id of the HTML element where we
    // want the game to go.
    // The assets (and code) can be found at: https://github.com/photonstorm/phaser/tree/master/examples/assets
    // You will need to change the paths you pass to "game.load.image()" or any other
    // loading functions to reflect where you are putting the assets.
    // All loading functions will typically all be found inside "preload()".
    
    var game = new Phaser.Game( 800, 600, Phaser.AUTO, 'game', { preload: preload, create: create, update: update } );
    
    function preload() {
        // Load food images
        game.load.image( 'fruit1', 'assets/fruit_01.png');
        game.load.image( 'fruit2', 'assets/fruit_02.png');
        game.load.image( 'fruit3', 'assets/fruit_03.png');
        game.load.image( 'fruit4', 'assets/fruit_04.png');
        game.load.image( 'fruit5', 'assets/fruit_05.png');
        game.load.image( 'protein1', 'assets/protein_01.png');
        game.load.image( 'protein2', 'assets/protein_02.png');
        game.load.image( 'protein3', 'assets/protein_03.png');
        game.load.image( 'protein4', 'assets/protein_04.png');
        game.load.image( 'protein5', 'assets/protein_05.png');
        game.load.image( 'sweet1', 'assets/sweet_01.png');
        game.load.image( 'sweet2', 'assets/sweet_02.png');
        game.load.image( 'sweet3', 'assets/sweet_03.png');
        game.load.image( 'sweet4', 'assets/sweet_04.png');
        game.load.image( 'sweet5', 'assets/sweet_05.png');
        game.load.image( 'vegetable1', 'assets/vegetable_01.png');
        game.load.image( 'vegetable2', 'assets/vegetable_02.png');
        game.load.image( 'vegetable3', 'assets/vegetable_03.png');
        game.load.image( 'vegetable4', 'assets/vegetable_04.png');
        game.load.image( 'vegetable5', 'assets/vegetable_05.png');
        game.load.image( 'pizza', 'assets/pizza.png' );
    }

    var score = 0;
    var food;
    var key;

    var status;
    var scoreCard;
    var checkScore;

    var fKey;
    var pKey;
    var sKey;
    var vKey;

    // Create table of items
   var items = [
        ['fruit1', 'fruit2', 'fruit3', 'fruit4', 'fruit5'],
        ['protein1', 'protein2', 'protein3', 'protein4', 'protein5'],
        ['vegetable1', 'vegetable2', 'vegetable3', 'vegetable4', 'vegetable5'],
        ['sweet1', 'sweet2', 'sweet3', 'sweet4', 'sweet5']
        ];

    function create() {
        // Title
        // Text is center in X, and position its top 15 pixels from the top of the world.
        var style = { font: "25px Verdana", fill: "#e3eda3", align: "center" };
        var text = game.add.text( game.world.centerX, 15, "Nutrition Nut!", style );
        text.anchor.setTo( 0.5, 0.0 );

        // Status text
        var statStyle = {font: "25px Verdana", fill: "#e3eda3", align: "center"};
        status = game.add.text( game.world.centerX, 15, "Is this a [F]ruit, [P]rotein, [V]egetable, or [S]weet?", statStyle );
        status.anchor.setTo( 0.5, -1.0 );

        // Score text
        var scoreStyle = {font: "50px Verdana", fill: "#20f704", align: "center"};
        scoreCard = game.add.text( game.world.centerX, 15, "Score: " + score, scoreStyle );
        scoreCard.anchor.setTo(0.5, -8.0);

        // Check score text
        var checkStyle = {font: "50px Verdana", fill: "#20f704", align: "center"};
        checkScore = game.add.text( game.world.centerX, 15, "", checkStyle);
        checkScore.anchor.setTo( 0.5, -5.5 );

        // hotkeys
        fKey = game.input.keyboard.addKey(Phaser.Keyboard.F);
        pKey = game.input.keyboard.addKey(Phaser.Keyboard.P);
        vKey = game.input.keyboard.addKey(Phaser.Keyboard.V);
        sKey = game.input.keyboard.addKey(Phaser.Keyboard.S);

        // Spawn a new food
        food = game.add.sprite( game.world.centerX, game.world.centerY, 'pizza' );
        food.scale.setTo( 10.0, 10.0 );
        food.anchor.setTo( 0.5, 0.5 );
        newFood();
    }

    function update() {
        // game.debug.text("Key: " + key, 32, 32);
        scoreCard.setText("Score: " + score);
        if (score >= 10) {
            status.setStyle({font: "25px Verdana", fill: "#ed0ae8", align: "center"});
            status.setText("YOU WIN A PIZZA PARTY!!!");
            pizzaParty();
        } else {
            if (fKey.downDuration(1)) {
                checkFood( 0 );
            } else if (pKey.downDuration(1)) {
                checkFood(1);
            } else if (vKey.downDuration(1)) {
                checkFood(2);
            } else if (sKey.downDuration(1)) {
                checkFood(3);
            }
        }
    }

    function checkFood(x) {
        // Create timer
        var timer = game.time.create(false);
        // Set to trigger new food event in 2 seconds
        timer.loop(2000, clearCheck, this);

        if (x === key) {
            checkScore.setStyle({font: "50px Verdana", fill: "#20f704", align: "center"});
            checkScore.setText("CORRECT!");
            score++;

        } else {
            checkScore.setStyle({font: "50px Verdana", fill: "#f20c1b", align: "center"});
            checkScore.setText("Try Again!");
            score = 0;
        }

        // Start timer
        timer.start();
        newFood();
    }

    function clearCheck() {
        checkScore.setText("");
    }

    function newFood() {
        // Choose random food type for key
        key = game.rnd.integerInRange( 0, 3 );
        // Choose random item in key type
        food.loadTexture(items[key][game.rnd.integerInRange( 0, 4 )])
    }

    function pizzaParty() {
        scoreCard.setText("");
        checkScore.setText("");
        food.loadTexture('pizza');
        var i, j;
        for(i = -4.0; i < 6.0; i++) {
            for(j = -4.2; j < 3.5; j++) {
                newPizza(i, j);
            }
        }
    }

    function newPizza(i, j) {
        var pizza = game.add.sprite( game.world.centerX, game.world.centerY, 'pizza' );
        pizza.scale.setTo( 5.0, 5.0 );
        pizza.anchor.setTo( i, j);
    }
};
