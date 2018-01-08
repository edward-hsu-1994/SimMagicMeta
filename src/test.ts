import { SimMagicMeta } from './SimMagicMeta';
import * as fs from 'fs';

(async function() {
  const binary = fs.readFileSync(process.cwd() + '/1489381877481.zip');
  const meta = await SimMagicMeta.load(binary);

  console.log(meta);
})();
