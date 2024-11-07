scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile0`, function (sprite, location) {
    tiles.placeOnRandomTile(Money, sprites.builtin.forestTiles0)
})
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    if (money_jump_count <= 1) {
        Money.vy = -150
        money_jump_count += 1
    }
})
let money_jump_count = 0
let Money: Sprite = null
scene.setBackgroundColor(9)
let GRAVITY = 370
tiles.setCurrentTilemap(tilemap`level2`)
Money = sprites.create(img`
    . . . . 8 8 8 8 8 . . . . . . . 
    . . . 8 2 2 2 2 2 8 . . . . . . 
    . . 8 d d d d 2 2 2 8 . . . . . 
    . 8 d f d d f d 2 2 8 8 . . . . 
    . 8 d f d d f d 2 2 d d 8 . . . 
    8 d 2 2 d d d d 2 2 b d 8 . . . 
    8 d d d d 8 d d 2 2 b d 8 . 8 8 
    8 8 8 8 8 d d d 2 2 8 8 . 8 2 8 
    . 8 d d d d d 2 2 8 8 . . 8 2 8 
    . . 8 8 8 8 8 2 2 2 2 8 . 8 2 8 
    . . . . 8 2 2 2 2 2 2 2 8 8 2 8 
    . . . 8 2 f f 2 f 2 2 2 2 8 8 . 
    . . . 8 2 f f 2 f 2 2 2 2 8 . . 
    . . . 8 d b f d b f f 2 8 . . . 
    . . . 8 d d c d d b b d 8 . . . 
    . . . . 8 8 8 8 8 8 8 8 8 . . . 
    `, SpriteKind.Player)
controller.moveSprite(Money, 100, 0)
Money.ay = GRAVITY
money_jump_count = 2
game.onUpdate(function () {
    if (Money.isHittingTile(CollisionDirection.Bottom)) {
        money_jump_count = 0
    }
})
