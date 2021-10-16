import { load } from '@fingerprintjs/fingerprintjs';

const fpPromise = load();

export const getFingerprint = async (): Promise<string> => {
    const fp = await fpPromise;
    const result = await fp.get();

    return result.visitorId;
};
