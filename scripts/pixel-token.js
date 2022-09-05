console.log("Loading Proper Pixels");

Hooks.on("canvasReady", () => {
    for (let token of canvas.tokens.placeables) {
        token.texture.baseTexture.setStyle(0,0);
        token.texture.baseTexture.update();
    }
    // there has to be an easier way to get tiles, right?
    for (let tile of canvas.layers[0].children[1].children) {
        tile.texture.baseTexture.setStyle(0,0);
        tile.texture.baseTexture.update();
    }

})

Hooks.on("createToken",  async (token) => {    
    // if this await doesn't exist, texture will return undefined
    // if you know a less-hacky way to do this, please feel free to send a PR
    await new Promise(resolve => setTimeout(resolve, 100));
    var baseTexture = token.object.texture.baseTexture;
    baseTexture.setStyle(0,0);
    baseTexture.update();
})

Hooks.on("updateToken", async (token) => {
    // await is my hammer for all these nails
    await new Promise(resolve => setTimeout(resolve, 250));
    var baseTexture = token.object.texture.baseTexture
    baseTexture.setStyle(0,0);
    baseTexture.update();
})

Hooks.on("createTile",  async (tile) => {    
    // you know the drill
    await new Promise(resolve => setTimeout(resolve, 100));
    var baseTexture = tile.object.texture.baseTexture;
    baseTexture.setStyle(0,0);
    baseTexture.update();
})

Hooks.on("updateTile", async (tile) => {
    await new Promise(resolve => setTimeout(resolve, 250));
    var baseTexture = tile.object.texture.baseTexture;
    baseTexture.setStyle(0,0);
    baseTexture.update();
})