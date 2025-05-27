/* eslint-disable require-await */
/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const { withDangerousMod, withPlugins } = require('@expo/config-plugins')
const fs = require('fs')
const path = require('path')

async function readFile(path) {
    return fs.promises.readFile(path, 'utf8')
}

async function saveFile(path, content) {
    return fs.promises.writeFile(path, content, 'utf8')
}

module.exports = (config) => withPlugins(config, [(config) => {
    return withDangerousMod(config, [
        'ios',
        async (config) => {
            const file = path.join(config.modRequest.platformProjectRoot, 'Podfile')
            /*
             * You need to remove the line before adding it.
             * If you don't do this and you run `expo prebuild` in a dirt project
             * your file will have the same line added twice
             */
            const headerContent = "config = use_native_modules!";
            const contents = (await readFile(file)).replace(
                headerContent,
                `\n  ` +
                `# React Native Maps dependencies\n  ` +
                `rn_maps_path = '../node_modules/react-native-maps'\n  ` +
                `pod 'react-native-google-maps', :path => rn_maps_path\n\n  ` +
                headerContent
            )
            /*
             * Now re-adds the content
             */
            await saveFile(file, contents);
            return config
        }
    ])
}])