/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const {
    AndroidConfig,
    withAndroidManifest,
    withDangerousMod,
    withStringsXml
} = require('expo/config-plugins');
const fs = require('fs');
const path = require('path');
const { THIRTY_MINUTES, EMPTY_LENGTH } = require('constants/AppConstants');
const { getMainApplicationOrThrow } = AndroidConfig.Manifest;

module.exports = function withAndroidWidgets(
    config,
    params
) {
    let projectPaths = {
        platformProjectRoot: '',
        projectRoot: '',
    };

    config = withAndroidManifest(
        config,
        (
            androidManifestConfig
        ) => {
            const mainApplication = getMainApplicationOrThrow(
                androidManifestConfig.modResults
            );
            withCollectionService(mainApplication);

            projectPaths.platformProjectRoot =
                androidManifestConfig.modRequest.platformProjectRoot;
            projectPaths.projectRoot = androidManifestConfig.modRequest.projectRoot;

            withConfigurableActivity(mainApplication, params);

            params.widgets.forEach((widget) => {
                withWidgetReceiver(androidManifestConfig, mainApplication, widget);
            });

            return androidManifestConfig;
        }
    );

    config = withWidgetDescriptions(config, params.widgets);
    config = withFonts(config, projectPaths, params.fonts ?? []);
    config = withWidgets(config, projectPaths, params.widgets);
    config = withConfigurableActivityClass(config, projectPaths, params.widgets);

    return config;
}

function withCollectionService(
    mainApplication
) {
    mainApplication.service = mainApplication.service ?? [];

    const alreadyAdded = mainApplication.service.some(
        (service) =>
            service.$['android:name'] ===
            'com.reactnativeandroidwidget.RNWidgetCollectionService'
    );

    if (alreadyAdded) {
        return;
    }

    mainApplication.service?.push({
        $: {
            'android:name': 'com.reactnativeandroidwidget.RNWidgetCollectionService',
            'android:permission': 'android.permission.BIND_REMOTEVIEWS',
        },
    });
}

function withConfigurableActivity(
    mainApplication,
    params
) {
    const hasConfigurableWidget = params.widgets.some(
        (widget) => !!widget.widgetFeatures
    );

    if (hasConfigurableWidget) {
        mainApplication.activity = mainApplication.activity ?? [];

        const alreadyAdded = mainApplication.activity.some(
            (activity) =>
                activity.$['android:name'] === '.WidgetConfigurationActivity'
        );

        if (alreadyAdded) {
            return;
        }

        mainApplication.activity?.push({
            '$': {
                'android:name': '.WidgetConfigurationActivity',
                'android:exported': 'true',
            },
            'intent-filter': [
                {
                    action: [
                        {
                            $: {
                                'android:name': 'android.appwidget.action.APPWIDGET_CONFIGURE',
                            },
                        },
                    ],
                },
            ],
        });
    }
}

function withConfigurableActivityClass(
    config,
    projectPaths,
    widgets
) {
    const hasConfigurableWidget = widgets.some(
        (widget) => !!widget.widgetFeatures
    );

    if (hasConfigurableWidget) {
        withDangerousMod(config, [
            'android',
            (dangerousConfig) => {
                const appPackage = path.join(
                    projectPaths.platformProjectRoot,
                    'android/app/src/main/java/' +
                    config.android?.package?.split('.').join('/')
                );

                const javaFilePath = path.join(
                    appPackage,
                    `/WidgetConfigurationActivity.java`
                );

                const data = `package ${config.android?.package};

import com.reactnativeandroidwidget.RNWidgetConfigurationActivity;

public class WidgetConfigurationActivity extends RNWidgetConfigurationActivity {
}
`;

                fs.writeFileSync(javaFilePath, data);

                return dangerousConfig;
            },
        ]);
    }

    return config;
}

function withWidgetReceiver(
    config,
    mainApplication,
    widget
) {
    mainApplication.receiver = mainApplication.receiver ?? [];

    const alreadyAdded = mainApplication.receiver.some(
        (service) => service.$['android:name'] === `.widget.${widget.name}`
    );

    if (alreadyAdded) {
        return;
    }

    mainApplication.receiver?.push({
        '$': {
            'android:name': `.widget.${widget.name}`,
            'android:exported': 'false',
            'android:label': `${widget.label ?? widget.name}`,
        },
        'intent-filter': [
            {
                action: [
                    {
                        $: {
                            'android:name': 'android.appwidget.action.APPWIDGET_UPDATE',
                        },
                    },
                    {
                        $: {
                            'android:name': `${config.android?.package}.WIDGET_CLICK`,
                        },
                    },
                ],
            },
        ],
        'meta-data': {
            $: {
                'android:name': 'android.appwidget.provider',
                'android:resource': `@xml/widgetprovider_${widget.name.toLowerCase()}`,
            },
        },
    });
}

function withWidgetDescriptions(config, widgets) {
    return withStringsXml(config, (stringsXml) => {
        widgets
            .filter((widget) => !!widget.description)
            .forEach((widget) => {
                stringsXml.modResults = AndroidConfig.Strings.setStringItem(
                    [
                        {
                            $: {
                                name: `widget_${widget.name.toLowerCase()}_description`,
                                translatable: 'false',
                            },
                            _: `${widget.description}`.replace(/'/g, "\\'"),
                        },
                    ],
                    stringsXml.modResults
                );
            });
        return stringsXml;
    });
}

function withFonts(
    config,
    androidManifestConfig,
    fonts
) {
    return withDangerousMod(config, [
        'android',
        (dangerousConfig) => {
            if (fonts.length === EMPTY_LENGTH) {
                return dangerousConfig;
            }

            const fontsDir = path.join(
                androidManifestConfig.platformProjectRoot,
                'android/app/src/main/assets/fonts'
            );
            fs.mkdirSync(fontsDir, { recursive: true });

            fonts.forEach((font) => {
                const fontAssetPath = path.resolve(
                    androidManifestConfig.projectRoot,
                    font
                );

                const output = path.join(fontsDir, path.basename(fontAssetPath));
                fs.copyFileSync(fontAssetPath, output);
            });
            return dangerousConfig;
        },
    ]);
}

function withWidgets(
    config,
    projectPaths,
    widgets
) {
    widgets.forEach((widget) => {
        withWidget(config, projectPaths, widget);
    });
    return config;
}

function withWidget(
    config,
    projectPaths,
    widget
) {
    withDangerousMod(config, [
        'android',
        (dangerousConfig) => {
            withWidgetProviderKotlin(dangerousConfig, projectPaths, widget);
            withWidgetProviderXml(dangerousConfig, projectPaths, widget);
            withWidgetPreview(projectPaths, widget);
            return dangerousConfig;
        },
    ]);
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function withWidgetProviderClass(
    config,
    projectPaths,
    widget
) {
    const widgetPackagePath = path.join(
        projectPaths.platformProjectRoot,
        'android/app/src/main/java/' +
        config.android?.package?.split('.').join('/') +
        '/widget'
    );

    const javaFilePath = path.join(widgetPackagePath, `/${widget.name}.java`);

    const data = `package ${config.android?.package}.widget;

import com.reactnativeandroidwidget.RNWidgetProvider;

public class ${widget.name} extends RNWidgetProvider {
}
`;

    fs.mkdirSync(widgetPackagePath, { recursive: true });

    fs.writeFileSync(javaFilePath, data);
}

function withWidgetProviderKotlin(
    config,
    projectPaths,
    widget
) {
    const widgetPackagePath = path.join(
        projectPaths.platformProjectRoot,
        'android/app/src/main/java/' +
        config.android?.package?.split('.').join('/') +
        '/widget'
    );

    const javaFilePath = path.join(widgetPackagePath, `/${widget.name}.kt`);

    const data = `package ${config.android?.package}.widget

import com.reactnativeandroidwidget.RNWidgetProvider

class ${widget.name}: RNWidgetProvider() {
}
`;

    fs.mkdirSync(widgetPackagePath, { recursive: true });

    fs.writeFileSync(javaFilePath, data);
}

function withWidgetProviderXml(
    config,
    projectPaths,
    widget
) {
    const xmlFolderPath = path.join(
        projectPaths.platformProjectRoot,
        'android/app/src/main/res/xml'
    );

    const xmlPath = path.join(
        xmlFolderPath,
        `/widgetprovider_${widget.name.toLowerCase()}.xml`
    );

    const data = `<?xml version="1.0" encoding="utf-8"?>
<appwidget-provider xmlns:android="http://schemas.android.com/apk/res/android"
    android:minWidth="${widget.minWidth}"
    android:minHeight="${widget.minHeight}"
${widget.maxResizeWidth
            ? `    android:maxResizeWidth="${widget.maxResizeWidth}"`
            : ''
        }
${widget.maxResizeHeight
            ? `    android:maxResizeHeight="${widget.maxResizeHeight}"`
            : ''
        }

    android:resizeMode="${widget.resizeMode ?? 'none'}"

${widget.description
            ? `    android:description="@string/widget_${widget.name.toLowerCase()}_description"`
            : ''
        }

    android:initialLayout="@layout/rn_widget"
${widget.previewImage
            ? `    android:previewImage="@drawable/${widget.name.toLowerCase()}_preview"`
            : ''
        }

${widget.widgetFeatures
            ? `    android:configure="${config.android?.package}.WidgetConfigurationActivity"
    android:widgetFeatures="${widget.widgetFeatures}"`
            : ''
        }

    android:updatePeriodMillis="${widget.updatePeriodMillis
            ? Math.max(THIRTY_MINUTES, widget.updatePeriodMillis)
            : EMPTY_LENGTH
        }"
    android:widgetCategory="home_screen">
</appwidget-provider>
`;

    fs.mkdirSync(xmlFolderPath, { recursive: true });

    fs.writeFileSync(xmlPath, data);
}

function withWidgetPreview(projectPaths, widget) {
    if (widget.previewImage) {
        const drawableDir = path.join(
            projectPaths.platformProjectRoot,
            'android/app/src/main/res/drawable'
        );
        fs.mkdirSync(drawableDir, { recursive: true });

        const previewAssetPath = path.resolve(
            projectPaths.projectRoot,
            widget.previewImage
        );

        const output = path.join(
            drawableDir,
            `${widget.name.toLowerCase()}_preview${path.extname(previewAssetPath)}`
        );
        fs.copyFileSync(previewAssetPath, output);
    }
}