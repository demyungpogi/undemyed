/* eslint-disable no-extra-boolean-cast */
/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const { withAndroidManifest, withDangerousMod, AndroidConfig } = require("expo/config-plugins");
const { getMainApplicationOrThrow } = AndroidConfig.Manifest;
const INDEX_ZERO = 0, OFFSET_ONE = 1;
const fs = require('fs');
const path = require('path');

module.exports = function withBackgroundActions(
    config
) {
    let projectPaths = {
        platformProjectRoot: '',
        projectRoot: '',
    };

    config = withAndroidManifest(config, (androidManifestConfig) => {
        projectPaths.platformProjectRoot = androidManifestConfig.modRequest.platformProjectRoot;
        projectPaths.projectRoot = androidManifestConfig.modRequest.projectRoot;


        const application = getMainApplicationOrThrow(androidManifestConfig.modResults);
        const service = !!application.service ? application.service : [];
        const metaData = !!application["meta-data"] ? application["meta-data"] : [];

        const activity = !!application.activity ? application.activity : [];

        let mainActivity = [];
        let intentFilter = [];

        activity.map(
            (activity) => {
                if (activity.$['android:name'] === '.MainActivity') {
                    mainActivity = activity;
                    intentFilter = !!activity["intent-filter"] ? activity["intent-filter"] : [];
                }
            }
        );

        const currentMainActivity = setMainActivityIntentFilters(mainActivity, intentFilter);

        const currentApplicationActivities = activity.map((activity) => {
            return (activity.$['android:name'] === '.MainActivity') ? {
                ...currentMainActivity
            } : { ...activity };
        });

        androidManifestConfig.modResults = {
            "manifest": {
                ...androidManifestConfig.modResults.manifest,
                "application": [{
                    ...application,
                    "activity": [
                        ...currentApplicationActivities
                    ],
                    "service": [
                        ...service,
                        {
                            $: {
                                "android:name": "com.asterinet.react.bgactions.RNBackgroundActionsTask"
                            }
                        }
                    ],
                    "meta-data": [
                        ...metaData,
                        // {
                        //     $: {
                        //         "android:name": "com.google.android.geo.API_KEY",
                        //         "android:value": process.env.GOOGLE_MAPS_API_KEY
                        //     }
                        // }
                    ],
                }]
            }
        }

        return androidManifestConfig;
    });

    setMainActivityClassOverrides(config, projectPaths);
    overrideLocalProperties(config, projectPaths);
    return config;
}


function overrideLocalProperties(config, projectPaths) {
    withDangerousMod(config, [
        'android',
        (dangerousConfig) => {
            if (process.env.ANDROID_HOME) {
                let local_properties_content = ``;
                const localPropertiesPath = path.join(projectPaths.projectRoot, 'android', `local.properties`);
                const local_properties = {
                    "sdk.dir": process.env.ANDROID_HOME
                }

                for (const [key, value] of Object.entries(local_properties)) {
                    local_properties_content += `\n${key}=${value}`;
                }

                fs.writeFileSync(localPropertiesPath, local_properties_content);
            }

            return dangerousConfig;
        },
    ]);
}

function setMainActivityClassOverrides(config, projectPaths) {
    withDangerousMod(config, [
        'android',
        (dangerousConfig) => {
            const appPackage = path.join(
                projectPaths.platformProjectRoot,
                'android/app/src/main/java/' +
                config.android?.package?.split('.').join('/')
            );

            let javaFilePath = path.join(
                appPackage,
                `/MainActivity.java`
            );
            let main_activity_contents = "";

            try {
                main_activity_contents = fs.readFileSync(javaFilePath, 'utf8');
            }
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            catch (err) {
                javaFilePath = path.join(
                    appPackage,
                    `/MainActivity.kt`
                );

                main_activity_contents = fs.readFileSync(javaFilePath, 'utf8');
            }

            let import_headers = main_activity_contents.split("import");

            /* DOCU: Modify code to include the Kotlin code changes for Android services */

            /* INSERT import */
            const importAndroidContents = [
                "android.content.Intent"
            ]

            importAndroidContents.map((element) =>
                import_headers[INDEX_ZERO] = import_headers[INDEX_ZERO] + `import ` + element + "\n"
            );

            let import_headers_str = import_headers.join(`import`);

            const class_split = "ReactActivity() {";
            let class_content = import_headers_str.split(class_split);

            const classFunctions = [`\n
    override fun onNewIntent(intent: Intent?) {
        super.onNewIntent(intent)
        setIntent(intent)
    }
`,
            ];

            classFunctions.map((element) =>
                class_content[OFFSET_ONE] = "\n" + element + "\n" + class_content[OFFSET_ONE]
            );

            class_content = class_content.join(class_split);

            fs.writeFileSync(javaFilePath, class_content);
            return dangerousConfig;
        },
    ]);

}

function setMainActivityIntentFilters(mainActivity, intentFilter) {
    return {
        $: {
            ...mainActivity.$,
        },
        'intent-filter': [
            ...intentFilter,
            {
                action: [
                    {
                        $: {
                            'android:name': 'android.intent.action.SEND',
                        },
                    },
                ],
                category: [
                    {
                        $: {
                            'android:name': 'android.intent.category.DEFAULT',
                        },
                    },
                ],
                data: [
                    {
                        $: {
                            'android:mimeType': 'text/*',
                        },
                    },
                ],
            },
            {
                action: [
                    {
                        $: {
                            'android:name': 'android.intent.action.SEND',
                        },
                    },
                ],
                category: [
                    {
                        $: {
                            'android:name': 'android.intent.category.DEFAULT',
                        },
                    },
                ],
                data: [
                    {
                        $: {
                            'android:mimeType': '*/*',
                        },
                    },
                ],
            },
            {
                action: [
                    {
                        $: {
                            'android:name': 'android.intent.action.SEND_MULTIPLE',
                        },
                    },
                ],
                category: [
                    {
                        $: {
                            'android:name': 'android.intent.category.DEFAULT',
                        },
                    },
                ],
                data: [
                    {
                        $: {
                            'android:mimeType': '*/*',
                        },
                    },
                ],
            },
        ],
    }
}