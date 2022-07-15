import createCache, { EmotionCache } from '@emotion/cache';

const createEmotionCache = (): EmotionCache => createCache({ key: 'css', prepend: true });

export default createEmotionCache;
