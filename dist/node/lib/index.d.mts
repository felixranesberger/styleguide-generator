declare global {
    var styleguideConfiguration: StyleguideConfiguration;
}
interface StyleguideConfiguration {
    mode: 'development' | 'production';
    outDir: string;
    contentDir: `${string}/`;
    projectTitle: string;
    deactivateDarkMode?: boolean;
    html: {
        lang: string;
        assets: {
            css: string[];
            js: {
                src: string;
                additionalAttributes?: Record<string, string>;
            }[];
        };
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
