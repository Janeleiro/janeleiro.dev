// Tira um print de uma página com Chrome headless via CDP, permitindo preparar o
// localStorage antes de carregar e rodar um script depois (ex.: clicar num botão).
// Uso: node design/tools/print_cdp.mjs <url> <saida.png> [--storage k=v] [--after "js"] [--wait ms] [--size 1366x854] [--media print] [--full 1]
import { spawn } from 'node:child_process';
import { writeFileSync, mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const [url, out, ...rest] = process.argv.slice(2);
const opt = { storage: [], after: '', wait: 6000, size: '1366x854', media: '', full: '' };
for (let i = 0; i < rest.length; i += 2) {
  const k = rest[i].replace(/^--/, '');
  if (k === 'storage') opt.storage.push(rest[i + 1]); else opt[k] = rest[i + 1];
}
const [width, height] = opt.size.split('x').map(Number);
const port = 9333;
const chrome = spawn('google-chrome', ['--headless=new', '--no-sandbox', '--disable-gpu', '--hide-scrollbars',
  `--remote-debugging-port=${port}`, `--user-data-dir=${mkdtempSync(join(tmpdir(), 'cdp-'))}`, 'about:blank'], { stdio: 'ignore' });

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
try {
  let targets;
  for (let i = 0; i < 40 && !targets; i++) {
    await sleep(250);
    targets = await fetch(`http://127.0.0.1:${port}/json`).then((r) => r.json()).catch(() => null);
  }
  const page = targets.find((t) => t.type === 'page');
  const ws = new WebSocket(page.webSocketDebuggerUrl);
  await new Promise((r) => ws.addEventListener('open', r, { once: true }));
  let id = 0;
  const pending = new Map();
  ws.addEventListener('message', (e) => {
    const msg = JSON.parse(e.data);
    if (msg.id && pending.has(msg.id)) { pending.get(msg.id)(msg.result); pending.delete(msg.id); }
  });
  const send = (method, params = {}) => new Promise((r) => { pending.set(++id, r); ws.send(JSON.stringify({ id, method, params })); });

  await send('Page.enable');
  await send('Emulation.setDeviceMetricsOverride', { width, height, deviceScaleFactor: 1, mobile: false });
  if (opt.media) await send('Emulation.setEmulatedMedia', { media: opt.media });
  if (opt.storage.length) {
    const origin = new URL(url).origin;
    const sets = opt.storage.map((kv) => {
      const i = kv.indexOf('=');
      return `localStorage.setItem(${JSON.stringify(kv.slice(0, i))}, ${JSON.stringify(kv.slice(i + 1))});`;
    }).join('');
    await send('Page.addScriptToEvaluateOnNewDocument', { source: `if (location.origin === ${JSON.stringify(origin)}) { ${sets} }` });
  }
  await send('Page.navigate', { url });
  await sleep(Number(opt.wait));
  if (opt.after) {
    await send('Runtime.evaluate', { expression: opt.after, awaitPromise: true });
    await sleep(Number(opt.wait));
  }
  const { data } = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: !!opt.full });
  writeFileSync(out, Buffer.from(data, 'base64'));
  console.log('ok', out);
  ws.close();
} finally {
  chrome.kill();
}
