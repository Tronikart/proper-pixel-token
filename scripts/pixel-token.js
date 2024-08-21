export function getAffectTiles() { return game.settings.get('proper-pixels', 'affectTiles') };
export function getAffectTokens() { return game.settings.get('proper-pixels', 'affectTokens') };
export function getIgnoreTag() { return game.settings.get('proper-pixels', 'tokenTag') };
export function getShouldIgnorePreTaggerReady(token) {
    const tags = token.document?.flags?.tagger?.tags;
    return game.modules.get('tagger')?.active && tags != null && (tags.find(t => t === getIgnoreTag()) != null)
};


Hooks.once('init', async function () {
    console.log("Loading Proper Pixels");

    game.settings.register('proper-pixels', 'affectTiles', {
        name: "Affects Tiles",
        hint: "If this is toggled, Tiles will be affected by this module",
        scope: "world",
        type: Boolean,
        default: 1,
        config: true,
        requiresReload: true,
        default: true
    });

    game.settings.register('proper-pixels', 'affectTokens', {
        name: "Affects Tokens",
        hint: "If this is toggled, Tokens will be affected by this module",
        scope: "world",
        type: Boolean,
        default: 1,
        config: true,
        requiresReload: true,
        default: true
    });
    game.settings.register('proper-pixels', 'tokenTag', {
            name: "Ignores Tokens with Tag",
            hint: "(requires Tagger module) If a value is set, tokens with this tag will be ignored",
            scope: "world",
            type: String,
            default: "ignore-pixel",
            config: true,
            requiresReload: true
        });

});

Hooks.on("canvasReady", () => {
    if (getAffectTokens()) {
        for (let token of canvas.tokens.placeables) {
            if (getShouldIgnorePreTaggerReady(token)) {
                return;
            }
            token.texture.baseTexture.setStyle(0, 0);
            token.texture.baseTexture.update();
        }
    }
    if (getAffectTiles()) {
        // there has to be an easier way to get tiles, right?
        for (let tile of canvas.tiles.placeables) {
            if (getShouldIgnorePreTaggerReady(tile)) {
                return;
            }
            tile.texture.baseTexture.setStyle(0, 0);
            tile.texture.baseTexture.update();
        }
    }
})

Hooks.on("createToken", async (token) => {
    // if this await doesn't exist, texture will return undefined
    // if you know a less-hacky way to do this, please feel free to send a PR
    if (getAffectTokens()) {
        if (Tagger != null && Tagger.hasTags(token, getIgnoreTag())) {
            return;
        }
        await new Promise(resolve => setTimeout(resolve, 100));
        const baseTexture = token.object.texture.baseTexture;
        baseTexture.setStyle(0, 0);
        baseTexture.update();
    }
})

Hooks.on("preUpdateToken", (token) => {
    if (getAffectTokens()) {
        if (Tagger != null && Tagger.hasTags(token, getIgnoreTag())) {
            return;
        }
        const baseTexture = token.object.texture.baseTexture;
        baseTexture.setStyle(0, 0);
    }
})

Hooks.on("createTile", async (tile) => {
    // you know the drill
    if (getAffectTiles()) {
        if (Tagger != null && Tagger.hasTags(tile, getIgnoreTag())) {
            return;
        }
        await new Promise(resolve => setTimeout(resolve, 100));
        const baseTexture = tile.object.texture.baseTexture;
        baseTexture.setStyle(0, 0);
        baseTexture.update();
    }
})

Hooks.on("preUpdateTile", (tile) => {
    if (getAffectTiles()) {
        if (Tagger != null && Tagger.hasTags(tile, getIgnoreTag())) {
            return;
        }
        const baseTexture = tile.object.texture.baseTexture;
        baseTexture.setStyle(0, 0);
    }
})
