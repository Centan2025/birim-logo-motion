import { defineConfig, Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { exec } from 'child_process';
import path from 'path';
import fs from 'fs';

function remotionRenderPlugin(): Plugin {
  return {
    name: 'remotion-render-api',
    configureServer(server) {
      // 1. /out/ klasöründeki dosyaları doğrudan indirme akışı olarak sun
      server.middlewares.use((req, res, next) => {
        if (req.url && req.url.startsWith('/out/')) {
          const cleanUrl = req.url.split('?')[0];
          const filePath = path.join(process.cwd(), cleanUrl);
          if (fs.existsSync(filePath)) {
            const stat = fs.statSync(filePath);
            const isWebm = filePath.endsWith('.webm');
            const isMp4 = filePath.endsWith('.mp4');
            const isMov = filePath.endsWith('.mov');
            res.writeHead(200, {
              'Content-Type': isWebm
                ? 'video/webm'
                : isMp4
                ? 'video/mp4'
                : isMov
                ? 'video/quicktime'
                : 'application/octet-stream',
              'Content-Length': stat.size,
              'Content-Disposition': `attachment; filename="${path.basename(filePath)}"`,
            });
            fs.createReadStream(filePath).pipe(res);
            return;
          }
        }
        next();
      });

      // 2. /api/render endpoint: Web arayüzünden doğrudan video render alma
      server.middlewares.use((req, res, next) => {
        if (req.url === '/api/render' && req.method === 'POST') {
          let body = '';
          req.on('data', (chunk) => {
            body += chunk;
          });
          req.on('end', () => {
            try {
              const data = JSON.parse(body || '{}');
              const {
                sceneId,
                transparent,
                headline = 'HİS',
                subtitle = '2004',
                projectCode = '',
                accentColor = '#FFFFFF',
                primaryColor = '#FFFFFF',
                fontFamily = "'Inter', sans-serif",
                headlineSize = 64,
                subtitleSize = 40,
                letterSpacing = 0.25,
                textOffsetX = 0,
                textOffsetY = 0,
                textAlign = 'left',
                textAnimation = 'char-wave',
                textDelayFrames = 30,
                durationInFrames = 150,
                showLogo = true,
                format = 'webm',
              } = data;

              if (!sceneId) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'sceneId parametresi gerekli' }));
                return;
              }

              const outDir = path.join(process.cwd(), 'out');
              if (!fs.existsSync(outDir)) {
                fs.mkdirSync(outDir, { recursive: true });
              }

              const totalFrames = Math.max(30, Math.min(600, Number(durationInFrames) || 150));
              const framesFlag = `--frames=0-${totalFrames - 1}`;

              const safeScene = String(sceneId).replace(/[^a-zA-Z0-9_-]/g, '');
              const timestamp = Date.now();
              const isWebm = format === 'webm';
              const isMov = format === 'mov' || format === 'prores';
              const ext = isWebm ? 'webm' : isMov ? 'mov' : 'mp4';
              const filename = `${safeScene}-${transparent ? 'seffaf-' : ''}${timestamp}.${ext}`;
              const outPath = path.join(outDir, filename);

              // JSON props
              const propsObj = {
                headline,
                subtitle,
                projectTitle: headline,
                architecturalPhase: subtitle,
                locationYear: projectCode,
                projectCode,
                accentColor,
                primaryColor,
                fontFamily,
                headlineSize: Number(headlineSize) || 64,
                subtitleSize: Number(subtitleSize) || 40,
                letterSpacing: Number(letterSpacing) ?? 0.25,
                textOffsetX: Number(textOffsetX) || 0,
                textOffsetY: Number(textOffsetY) || 0,
                textAlign: textAlign || 'left',
                textAnimation: textAnimation || 'char-wave',
                textDelayFrames: textDelayFrames !== undefined ? Number(textDelayFrames) : 30,
                showLogo: showLogo !== false,
                transparentBackground: !!transparent,
                backgroundColor: transparent ? 'transparent' : '#0B0D10',
              };

              // Windows komut satırında tırnak bozulmasını önlemek için geçici JSON dosyası kullan
              const propsFile = path.join(outDir, `props-${timestamp}.json`);
              fs.writeFileSync(propsFile, JSON.stringify(propsObj, null, 2), 'utf8');

              let cmd = '';
              if (isWebm) {
                // Şeffaf Alpha WebM
                cmd = `npx remotion render src/index.ts "${sceneId}" "${outPath}" ${framesFlag} --image-format=png --pixel-format=yuva420p --props="${propsFile}"`;
              } else if (isMov) {
                // Şeffaf Apple ProRes 4444 MOV
                cmd = `npx remotion render src/index.ts "${sceneId}" "${outPath}" ${framesFlag} --codec=prores --prores-profile=4444 --pixel-format=yuva444p10le --props="${propsFile}"`;
              } else {
                // Standart H264 MP4
                cmd = `npx remotion render src/index.ts "${sceneId}" "${outPath}" ${framesFlag} --props="${propsFile}"`;
              }

              console.log(`[Remotion API] Render başlatıldı: ${sceneId} -> ${filename}`);

              exec(cmd, { cwd: process.cwd() }, (err, stdout, stderr) => {
                try {
                  if (fs.existsSync(propsFile)) {
                    fs.unlinkSync(propsFile);
                  }
                } catch {
                  // ignore
                }

                if (err) {
                  console.error('[Remotion API Hatası]:', stderr || err.message);
                  res.writeHead(500, { 'Content-Type': 'application/json' });
                  res.end(JSON.stringify({ error: err.message, details: stderr }));
                  return;
                }

                console.log(`[Remotion API] Render tamamlandı: ${filename}`);
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(
                  JSON.stringify({
                    success: true,
                    downloadUrl: `/out/${filename}`,
                    filename,
                  })
                );
              });
            } catch (err: unknown) {
              const message = err instanceof Error ? err.message : String(err);
              res.writeHead(400, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ error: 'Geçersiz istek', details: message }));
            }
          });
          return;
        }
        next();
      });
    },
  };
}

export default defineConfig({
  base: './',
  plugins: [react(), remotionRenderPlugin()],
  build: {
    outDir: 'dist',
  },
});
