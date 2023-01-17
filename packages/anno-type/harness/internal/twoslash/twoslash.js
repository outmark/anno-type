// @ts-check

/** @type {twoslashSourceText.Twoslasher?} */
let defaultTwoslasher;

/**
 * 
 * @param {string} sourceText 
 * @param {string} sourceExtension 
 * @param {twoslashSourceText.Options | undefined} [options] 
 */
export async function twoslashSourceText(sourceText, sourceExtension, options) {
    const {
        twoslasher = /** @type {twoslashSourceText.Twoslasher} */ (defaultTwoslasher ?? await importTwoslasher()),
        ...twoslashOptions
    } = { ...options };

    // {
    //     const {
    //         tsModule,
    //         ...otherOptions
    //     } = twoslashOptions;

    //     console.log(otherOptions);
    // }


    return twoslasher(sourceText, sourceExtension, twoslashOptions);
}

export async function importTwoslasher(specifier = '@typescript/twoslash') {
    return /** @type {twoslashSourceText.Twoslasher} */ (
        defaultTwoslasher ?? (defaultTwoslasher = ((await import(specifier)).twoslasher))
    );
}

/** @typedef {import('@typescript/twoslash')['twoslasher']} twoslashSourceText.Twoslasher */
/** @typedef {import('@typescript/twoslash').TwoSlashReturn} twoslashSourceText.TwoslashResult */
/** @typedef {import('@typescript/twoslash').TwoSlashOptions} twoslashSourceText.TwoSlashOptions */
/** @typedef {twoslashSourceText.TwoSlashOptions & Partial<{twoslasher: twoslashSourceText.Twoslasher}>} twoslashSourceText.Options */
/** @typedef {twoslashSourceText.TwoslashResult} twoslashSourceText.Result */