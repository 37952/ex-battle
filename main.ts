namespace SpriteKind {
    export const p1 = SpriteKind.create()
    export const pro = SpriteKind.create()
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile0`, function (sprite, location) {
    tiles.placeOnRandomTile(sprite, sprites.builtin.forestTiles0)
    if (sprite == Money) {
        info.player1.changeLifeBy(-1)
    } else if (sprite == joejoe) {
        info.player2.changeLifeBy(-1)
    }
})
controller.player2.onButtonEvent(ControllerButton.B, ControllerButtonEvent.Pressed, function () {
    if (joejoe_jump_count <= 1) {
        joejoe.vy = -150
        joejoe_jump_count += 1
    }
})
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    if (money_jump_count <= 1) {
        Money.vy = -150
        money_jump_count += 1
    }
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    projectilem = sprites.createProjectileFromSprite(img`
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
    projectilem.setKind(SpriteKind.pro)
    if (Money.image == money_left_image) {
        projectilem.vx = projectilem.vx * -1
    }
})
controller.player2.onButtonEvent(ControllerButton.A, ControllerButtonEvent.Pressed, function () {
    footballprojectile = sprites.createProjectileFromSprite(img`
        . . 6 6 6 6 . . 
        . 6 d 4 4 4 b . 
        . c b 1 1 4 4 b 
        . c b b 4 4 d b 
        . . c b b d 1 c 
        . . . c c b b . 
        `, joejoe, 201, -10)
    footballprojectile.setKind(SpriteKind.p1)
    if (joejoe.image == joejoe_left_image) {
        footballprojectile.vx = footballprojectile.vx * -1
    }
})
sprites.onOverlap(SpriteKind.pro, SpriteKind.Player, function (sprite, otherSprite) {
    if (otherSprite == joejoe) {
        info.player2.changeLifeBy(-1)
        sprites.destroy(sprite)
    }
})
sprites.onOverlap(SpriteKind.p1, SpriteKind.Player, function (sprite, otherSprite) {
    if (otherSprite == Money) {
        info.player1.changeLifeBy(-1)
        sprites.destroy(sprite)
    }
})
function create_joejoe () {
    joejoe_left_image = img`
        . . . . 4 4 4 4 4 . . . . . . . 
        . . . 4 5 5 5 5 5 4 4 4 . . . . 
        . . 4 d d d 5 5 5 5 d d 4 . . . 
        . 4 d d d d d 5 5 5 b d 4 . . . 
        . 4 d d d d d d 5 5 b d 4 . . . 
        4 d d f d d f d 5 5 4 4 . 4 4 . 
        4 d d f d d f d 5 5 4 . . 4 5 4 
        4 d 5 5 d d d d 5 5 4 . . 4 5 4 
        . 4 d d d c d 5 5 4 4 . . 4 5 4 
        . . 4 4 4 d 5 5 5 5 5 4 . 4 5 4 
        . . . . 4 5 5 5 5 5 5 5 4 4 4 . 
        . . . . 4 4 5 5 5 5 5 b 4 4 . . 
        . . . 4 5 4 4 5 5 c d d 4 4 . . 
        . . 4 d d b d d c 4 4 4 . . . . 
        . . 4 d d c d d d 4 4 . . . . . 
        . . . 4 4 4 4 4 4 4 . . . . . . 
        `
    joejoe_right_image = joejoe_left_image.clone()
    joejoe_right_image.flipX()
    joejoe = sprites.create(joejoe_left_image, SpriteKind.Player)
    controller.player2.moveSprite(joejoe, 100, 0)
    joejoe.ay = GRAVITY
    info.player2.setLife(71)
}
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
    info.setLife(71)
}
info.player1.onLifeZero(function () {
    game.splash("p2 wins")
})
info.player2.onLifeZero(function () {
    game.splash("p1 wins")
})
let money_right_image: Image = null
let joejoe_right_image: Image = null
let joejoe_left_image: Image = null
let footballprojectile: Sprite = null
let money_left_image: Image = null
let projectilem: Sprite = null
let joejoe: Sprite = null
let Money: Sprite = null
let joejoe_jump_count = 0
let money_jump_count = 0
let GRAVITY = 0
scene.setBackgroundColor(9)
GRAVITY = 370
tiles.setCurrentTilemap(tilemap`level2`)
money_jump_count = 2
joejoe_jump_count = 2
scene.centerCameraAt(69, 74)
create_money()
create_joejoe()
game.onUpdate(function () {
    if (Money.vx < 0) {
        Money.setImage(money_left_image)
    } else if (Money.vx > 0) {
        Money.setImage(money_right_image)
    }
})
game.onUpdate(function () {
    if (Money.isHittingTile(CollisionDirection.Bottom)) {
        money_jump_count = 0
    }
})
game.onUpdate(function () {
    if (joejoe.vx < 0) {
        joejoe.setImage(joejoe_left_image)
    } else if (joejoe.vx > 0) {
        joejoe.setImage(joejoe_right_image)
    }
})
game.onUpdate(function () {
    if (joejoe.isHittingTile(CollisionDirection.Bottom)) {
        joejoe_jump_count = 0
    }
})
