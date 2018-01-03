import { SimMagicMeta } from "./SimMagicMeta";
import * as fs from 'fs';

const binary = fs.readFileSync(process.cwd() + '/1489381877481.zip');
SimMagicMeta.load(binary);