interface ColorObject {
    name?: string;
    color: string;
    description?: string;
}
interface IconObject {
    name: string;
    svg: string;
}
interface in2Section {
    id: string;
    sectionLevel: 'first' | 'second' | 'third';
    header: string;
    description: string;
    hasMarkdownDescription: boolean;
    markup: string;
    modifiers: {
        value: string;
        description: string;
    }[];
    colors?: ColorObject[];
    icons?: IconObject[];
    figma?: string;
    wrapper?: string;
    htmlclass?: string;
    bodyclass?: string;
    sourceFileName: string;
    previewFileName: string;
    fullpageFileName: string;
}

declare global {
    var isWatchMode: boolean;
    var styleguideConfiguration: StyleguideConfiguration;
}
interface StyleguideConfiguration {
    mode: 'development' | 'production';
    outDir: string;
    contentDir: `${string}/`;
    projectTitle: string;
    deactivateDarkMode?: boolean;
    launchInEditor?: boolean | {
        rootDir: string;
    };
    theme: string | {
        light: string;
        dark: string;
    };
    html: {
        lang: string;
        assets: {
            css: {
                type?: 'regular' | 'overwriteStyleguide';
                src: string;
            }[];
            js: {
                type?: 'regular' | 'overwriteStyleguide';
                src: string;
                additionalAttributes?: Record<string, string>;
            }[];
        };
    };
    plugins?: {
        ogImage?: (section: in2Section) => string;
    };
}
/**
 * Builds the styleguide
 * @param config - The configuration for the styleguide
 */
declare function buildStyleguide(config: StyleguideConfiguration): Promise<void>;
/**
 * Builds the styleguide and watches for changes
 * @param config - The configuration for the styleguide
 */
declare function watchStyleguide(config: StyleguideConfiguration, onChange?: () => void): Promise<void>;

export { type StyleguideConfiguration, buildStyleguide, watchStyleguide };
