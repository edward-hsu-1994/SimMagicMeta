import * as JSZip from 'jszip';
import { DOMParser } from 'xmldom';

/**
 * Sim Magic 電子書檔案中介資料
 */
export class SimMagicMeta {
    sliceCount;
    lastModifyTime;
    target;
    scope;
    introduction;
    purpose;
    author;
    name;

    public static async load(binary: string | number[] | Uint8Array | ArrayBuffer | Blob): Promise<SimMagicMeta> {
        const zip = await JSZip.loadAsync(binary);
        const indexConfigString = await zip.file('index.xml').async("text");
        const indexConfig = new DOMParser().parseFromString(indexConfigString, 'text/xml').documentElement;
        const meta = indexConfig.getElementsByTagName("ProjectMetadata")[0];

        const result = new SimMagicMeta();



        return result;
    }
}