console.log("Loading Proper Pixel Tokens");

Hooks.on("canvasReady", async () => {
    for (let token of canvas.tokens.placeables) {
        console.log(token)
        await token.texture.baseTexture.setStyle(0,0);
        await token.texture.baseTexture.update();
    }
})

Hooks.on("createToken",  async (token, options, user) => {    
    await new Promise(resolve => setTimeout(resolve, 100));
    var token = token.object;
    console.log("token");
    console.log(token);
    var texture = token.texture;
    console.log("texture");
    console.log(texture);
    var baseTexture = texture.baseTexture;
    console.log("token");
    console.log(token);
    baseTexture.setStyle(0,0);
    baseTexture.update();
})