/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const { withGradleProperties } = require('@expo/config-plugins');

module.exports = (config) => {
    const override_properties = {
        "org.gradle.jvmargs": "-Xmx4096m -XX:MaxMetaspaceSize=2048m"
    }

    return withGradleProperties(config, (config) => {
        let modifiedResults = config.modResults.map((gradleProperty) => {
            if (gradleProperty.type === "property" && (gradleProperty.key in override_properties)) {
                gradleProperty.value = override_properties[gradleProperty.key];
            }

            return gradleProperty;
        });

        config.modResults = modifiedResults;
        return config;
    });
};