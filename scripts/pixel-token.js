console.log("Loading Proper Pixels");

Hooks.on("canvasReady", async () => {
    for (let token of canvas.tokens.placeables) {
        console.log(token)
        await token.texture.baseTexture.setStyle(0,0);
        await token.texture.baseTexture.update();
    }
})

Hooks.on("createToken",  async (token, options, user) => {    
    // if this await doesn't exist, texture will return undefined
    // if you know a less-hacky way to do this, please feel free to send a PR
    await new Promise(resolve => setTimeout(resolve, 100));
    var baseTexture = token.object.texture.baseTexture;
    baseTexture.setStyle(0,0);
    baseTexture.update();
})