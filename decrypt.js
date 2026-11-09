const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const PASSWORD = process.argv[2] || 'Jeremy43209';
const SRC_DIR = path.join(__dirname, 'case-studies-src');
const DIST_DIR = __dirname;

const FILES = [
  'ai-workflows.html',
  'cross-os-rcs.html',
  'benchmarking-premiumness.html',
  'admob.html'
];

function decryptPayload(base64Payload, password) {
  const raw = Buffer.from(base64Payload, 'base64');
  const salt = raw.subarray(0, 16);
  const iv = raw.subarray(16, 28);
  const encryptedAndTag = raw.subarray(28);

  // In Node GCM: tag is the last 16 bytes
  const ciphertext = encryptedAndTag.subarray(0, encryptedAndTag.length - 16);
  const tag = encryptedAndTag.subarray(encryptedAndTag.length - 16);

  const key = crypto.pbkdf2Sync(password, salt, 100000, 32, 'sha256');
  const decipher = crypto.createDecipheriv('aes-256-gcm', key, iv);
  decipher.setAuthTag(tag);

  const decrypted = Buffer.concat([decipher.update(ciphertext), decipher.final()]);
  return decrypted.toString('utf8');
}

function run() {
  if (!fs.existsSync(SRC_DIR)) {
    fs.mkdirSync(SRC_DIR, { recursive: true });
  }

  console.log(`Decrypting case studies using password...`);

  FILES.forEach((file) => {
    const encPath = path.join(DIST_DIR, file);
    const destPath = path.join(SRC_DIR, file);

    if (!fs.existsSync(encPath)) {
      console.warn(`File not found: ${encPath}`);
      return;
    }

    const html = fs.readFileSync(encPath, 'utf8');
    const match = html.match(/<script id="encrypted-payload" type="application\/json">\s*(\{[\s\S]*?\})\s*<\/script>/);

    if (!match) {
      console.warn(`No encrypted payload found in ${file}. It may already be unencrypted.`);
      return;
    }

    try {
      const { payload } = JSON.parse(match[1]);
      const decrypted = decryptPayload(payload, PASSWORD);
      fs.writeFileSync(destPath, decrypted, 'utf8');
      console.log(` Decrypted ${file} -> case-studies-src/${file} (${(decrypted.length / 1024).toFixed(1)} KB)`);
    } catch (err) {
      console.error(` Failed to decrypt ${file}: Incorrect password or corrupted payload.`);
    }
  });

  console.log('Decryption routine complete.');
}

run();
