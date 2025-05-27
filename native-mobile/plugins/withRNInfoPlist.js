/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const { withInfoPlist } = require('@expo/config-plugins');

module.exports = (config) => {
    const override_properties = {
        "CFBundleURLSchemes": [process.env.IOS_URL_SCHEME]
    }

    return withInfoPlist(config, (config) => {
        // /* HOTFIX */ console.log("withRNInfoPlist: ", config);
        return config;
    })
}