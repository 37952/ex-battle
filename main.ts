scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile0`, function (sprite, location) {
    tiles.placeOnRandomTile(sprite, sprites.builtin.forestTiles0)
})
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    if (money_jump_count <= 1) {
        Money.vy = -150
        money_jump_count += 1
    }
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    projectile = sprites.createProjectileFromSprite(img`
        . . . . . . . . . . 
        . . . 7 7 7 7 . . . 
        . . 7 8 8 8 8 7 . . 
        . 7 9 2 d 4 2 9 7 . 
        7 9 d 4 2 2 4 d 6 7 
        7 6 b b 2 2 4 d 9 7 
        . 7 9 2 b 4 2 9 7 . 
        . . 7 8 8 8 8 7 . . 
        . . . 7 7 7 7 . . . 
        . . . . . . . . . . 
        `, Money, 201, -10)
    if (Money.image == money_left_image) {
        projectile.vx = projectile.vx * -1
    }
})
function create_money () {
    money_left_image = img`
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
        `
    money_right_image = money_left_image.clone()
    money_right_image.flipX()
    Money = sprites.create(money_left_image, SpriteKind.Player)
    controller.moveSprite(Money, 100, 0)
    Money.ay = GRAVITY
}
let money_right_image: Image = null
let money_left_image: Image = null
let projectile: Sprite = null
let Money: Sprite = null
let money_jump_count = 0
let GRAVITY = 0
scene.setBackgroundColor(9)
GRAVITY = 370
tiles.setCurrentTilemap(tilemap`level2`)
money_jump_count = 2
scene.centerCameraAt(69, 74)
create_money()
game.onUpdate(function () {
    if (Money.isHittingTile(CollisionDirection.Bottom)) {
        money_jump_count = 0
    }
})
game.onUpdate(function () {
    if (Money.vx < 0) {
        Money.setImage(money_left_image)
    } else if (Money.vx > 0) {
        Money.setImage(money_right_image)
    }
})
