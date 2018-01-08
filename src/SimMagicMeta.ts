import * as JSZip from 'jszip';
import { DOMParser } from 'xmldom';

/**
 * Sim Magic 電子書檔案中介資料
 */
export class SimMagicMeta {
  sliceCount = null;
  lastModifyTime = null;
  target = null;
  scope = null;
  introduction = null;
  purpose = null;
  author = null;
  name = null;

  private setProperty(name: string, value: any) {
    for (const key in this) {
      if (!this.hasOwnProperty(key)) continue;
      if (key.toUpperCase() === name.toUpperCase()) {
        this[key] = value;
      }
    }
  }

  public static async load(
    binary: string | number[] | Uint8Array | ArrayBuffer | Blob
  ): Promise<SimMagicMeta> {
    const zip = await JSZip.loadAsync(binary);
    const indexConfigString = await zip.file('index.xml').async('text');
    const indexConfig = new DOMParser().parseFromString(
      indexConfigString,
      'text/xml'
    ).documentElement;
    const meta = indexConfig.getElementsByTagName('ProjectMetadata')[0];

    let result = new SimMagicMeta();

    for (let i = 0; i < meta.attributes.length; i++) {
      result.setProperty(meta.attributes[i].name, meta.attributes[i].value);
    }

    return result;
  }
}
