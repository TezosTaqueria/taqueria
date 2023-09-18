import fs from 'fs';
import crypto from 'crypto';
import multihashes from 'multihashes';
export async function getFileIPFSHash(filePath: string): Promise<string> {
  const fileContent = fs.readFileSync(filePath);
  const hash = crypto.createHash('sha256').update(fileContent).digest();
  const ipfsHash = Buffer.from(multihashes.encode(hash, 'sha2-256')).toString('hex'); 
  return ipfsHash;
}
