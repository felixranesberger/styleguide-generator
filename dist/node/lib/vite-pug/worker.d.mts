import { StyleguideConfiguration } from '../index.mjs';

/**
 * Replaces all <insert-vite-pug src="path/to/file.pug" modifierClass="modifier"> tags with the pug file content
 * depending on the mode provided
 */
declare function compilePug(contentDir: `${string}/`, mode: StyleguideConfiguration['mode'], html: string): Promise<string>;
interface PugWorkerInput {
    id: string;
    mode: StyleguideConfiguration['mode'];
    contentDir: `${string}/`;
    html: string;
}
interface PugWorkerSuccess {
    id: string;
    html: string;
}
interface PugWorkerError {
    error: string;
}
type PugWorkerOutput = PugWorkerSuccess | PugWorkerError;

export { type PugWorkerInput, type PugWorkerOutput, compilePug };
