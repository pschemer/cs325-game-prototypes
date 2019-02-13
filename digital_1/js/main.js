"use strict";

/*
    Patrick Schemering
    pschemer
    Digital Assignment 1
 */

/*
    Original skeleton template from https://github.com/GMU-CS325/cs325-game-prototypes/
 */
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
        game.load.image( 'fruit01', 'assets/fruit_04.png');
        game.load.image( 'fruit01', 'assets/fruit_04.png');
    }
    
    var items;
    var food;
    var key;

    function create() {
        // Create table of items
        items = [
        [fruit1, fruit2, fruit3, fruit4, fruit5],
        [protein1, protein2, protein3, protein4, protein5],
        [sweet1, sweet2, sweet3, sweet4, sweet5],
        [vegetable1, vegetable2, vegetable3, vegetable4, vegetable5]
        ];
        // Choose random item and create sprite in world
        var key = getRandomInt(3);
        var food = items[key][getRandomInt(4)];
        food = game.add.sprite( game.world.centerX, game.world.centerY, food );
        // Anchor the sprite at its center, as opposed to its top-left corner.
        // so it will be truly centered.
        bouncy.anchor.setTo( 0.5, 0.5 );

        // Add some text using a CSS style.
        // Center it in X, and position its top 15 pixels from the top of the world.
        var style = { font: "25px Verdana", fill: "#9999ff", align: "center" };
        var text = game.add.text( game.world.centerX, 15, "Build something amazing.", style );
        text.anchor.setTo( 0.5, 0.0 );
    }
    
    function update() {
        // Accelerate the 'logo' sprite towards the cursor,
        // accelerating at 500 pixels/second and moving no faster than 500 pixels/second
        // in X or Y.
        // This function returns the rotation angle that makes it visually match its
        // new trajectory.
        bouncy.rotation = game.physics.arcade.accelerateToPointer( bouncy, game.input.activePointer, 500, 500, 500 );
    }

};
