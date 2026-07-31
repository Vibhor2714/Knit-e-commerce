import 'dotenv/config';
import fs from 'node:fs/promises';
import path from 'node:path';
import mongoose from 'mongoose';
import Product from '../models/Product.js';

if (!process.env.MONGODB_URI) throw new Error('MONGODB_URI is missing. Add it to Backend/.env first.');

const sourcePath = path.resolve('../Frontend/src/assets/assets.js');
const source = await fs.readFile(sourcePath, 'utf8');
const catalogue = source.slice(source.indexOf('export const products = ['), source.lastIndexOf('];'));
const blocks = catalogue.match(/\{\s*_id:[\s\S]*?\n\s*}\s*,?/g) || [];
const parse = (block, pattern) => block.match(pattern)?.[1];
const products = blocks.map((block) => ({
  sku: parse(block, /_id:\s*"([^"]+)"/) || parse(block, /_id:\s*'([^']+)'/),
  name: parse(block, /name:\s*"([^"]+)"/) || parse(block, /name:\s*'([^']+)'/),
  description: parse(block, /description:\s*"([^"]+)"/) || parse(block, /description:\s*'([^']+)'/),
  price: Number(parse(block, /price:\s*(\d+)/)),
  category: parse(block, /category:\s*"([^"]+)"/) || parse(block, /category:\s*'([^']+)'/),
  subCategory: parse(block, /subCategory:\s*"([^"]+)"/) || parse(block, /subCategory:\s*'([^']+)'/),
  sizes: [...(parse(block, /sizes:\s*\[([^\]]*)]/) || '').matchAll(/['"]([^'"]+)['"]/g)].map((match) => match[1]),
  bestseller: parse(block, /bestseller:\s*(true|false)/) === 'true',
  images: []
})).filter((product) => product.sku && product.name);

await mongoose.connect(process.env.MONGODB_URI);
await Product.bulkWrite(products.map((product) => ({ updateOne: { filter: { sku: product.sku }, update: { $set: product }, upsert: true } })));
console.log(`Seeded ${products.length} Knit products.`);
await mongoose.disconnect();
