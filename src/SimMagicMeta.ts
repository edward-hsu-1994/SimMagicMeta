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

        let result = new SimMagicMeta();

        let attributes: Attr[] = [];
        for (let _i = meta.attributes.length - 1; _i >= 0; _i--) {
            attributes.push(meta.attributes[_i]);
        }
        for (let attribute of attributes) {
            switch (attribute.name.toUpperCase()) {
                case 'sliceCount'.toUpperCase(): {
                    result.sliceCount = attribute.value;
                    break;
                }
                case 'lastModifyTime'.toUpperCase(): {
                    result.lastModifyTime = attribute.value;
                    break;
                }
                case 'target'.toUpperCase(): {
                    result.target = attribute.value;
                    break;
                }
                case 'scope'.toUpperCase(): {
                    result.scope = attribute.value;
                    break;
                }
                case 'introduction'.toUpperCase(): {
                    result.introduction = attribute.value;
                    break;
                }
                case 'purpose'.toUpperCase(): {
                    result.purpose = attribute.value;
                    break;
                }
                case 'author'.toUpperCase(): {
                    result.author = attribute.value;
                    break;
                }
                case 'name'.toUpperCase(): {
                    result.name = attribute.value;
                    break;
                }
                default: {
                    //statements; 
                    break;
                }
            }
        }

        return result;
    }
}