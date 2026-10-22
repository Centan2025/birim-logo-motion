import { defineConfig, Plugin, ViteDevServer, PreviewServer } from 'vite';
import react from '@vitejs/plugin-react';
import { spawn } from 'child_process';
import path from 'path';
import fs from 'fs';

function registerRenderMiddlewares(server: ViteDevServer | PreviewServer) {
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
                tagline = '',
                projectCode = '',
                accentColor = '#FFFFFF',
                primaryColor = '#FFFFFF',
                taglineColor = '#C89D66',
                fontFamily = "'Inter', sans-serif",
                headlineSize = 64,
                subtitleSize = 40,
                taglineSize = 28,
                letterSpacing = 0.25,
                textOffsetX = 0,
                textOffsetY = 0,
                textAlign = 'left',
                textAnimation = 'char-wave',
                textDelayFrames = 30,
                line1Delay,
                line2Delay,
                line3Delay,
                durationInFrames = 150,
                playbackSpeed = 1,
                showLogo = true,
                format = 'webm',
                aspectRatio = '16:9',
                exitAnimation = 'none',
                exitTarget = 'both',
                exitDurationFrames = 25,
                exitStartFrame,
                exitTimingMode = 'before-end',
                exitDelayFrames = 0,
                customLogo = null,
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

              const totalFrames = Math.max(30, Math.min(3600, Number(durationInFrames) || 150));
              const framesFlag = `--frames=0-${totalFrames - 1}`;

              const safeScene = String(sceneId).replace(/[^a-zA-Z0-9_-]/g, '');
              const timestamp = Date.now();
              const isWebm = format === 'webm';
              const isMov = format === 'mov' || format === 'prores';
              const ext = isWebm ? 'webm' : isMov ? 'mov' : 'mp4';
              const ratioTag = aspectRatio === '9:16' ? 'dikey-9x16-' : aspectRatio === '1:1' ? 'kare-1x1-' : 'yatay-16x9-';
              const filename = `${safeScene}-${ratioTag}${transparent ? 'seffaf-' : ''}${timestamp}.${ext}`;
              const outPath = path.join(outDir, filename);

              // JSON props
              const propsObj = {
                headline,
                subtitle,
                tagline,
                projectTitle: headline,
                architecturalPhase: subtitle,
                locationYear: projectCode,
                projectCode,
                accentColor,
                primaryColor,
                taglineColor: taglineColor || accentColor,
                fontFamily,
                headlineSize: Number(headlineSize) || 64,
                subtitleSize: Number(subtitleSize) || 40,
                taglineSize: Number(taglineSize) || 28,
                letterSpacing: Number(letterSpacing) ?? 0.25,
                textOffsetX: Number(textOffsetX) || 0,
                textOffsetY: Number(textOffsetY) || 0,
                textAlign: textAlign || 'left',
                textAnimation: textAnimation || 'char-wave',
                textDelayFrames: textDelayFrames !== undefined ? Number(textDelayFrames) : 30,
                line1Delay: line1Delay !== undefined ? Number(line1Delay) : (textDelayFrames !== undefined ? Number(textDelayFrames) : 20),
                line2Delay: line2Delay !== undefined ? Number(line2Delay) : 32,
                line3Delay: line3Delay !== undefined ? Number(line3Delay) : 44,
                showLogo: showLogo !== false,
                transparentBackground: !!transparent,
                backgroundColor: transparent ? 'transparent' : '#0B0D10',
                aspectRatio: aspectRatio || '16:9',
                playbackSpeed: Number(playbackSpeed) || 1,
                durationInFrames: totalFrames,
                exitAnimation: exitAnimation || 'none',
                exitTarget: exitTarget || 'both',
                exitDurationFrames: Number(exitDurationFrames) || 25,
                exitStartFrame: exitStartFrame !== undefined ? Number(exitStartFrame) : undefined,
                exitTimingMode: exitTimingMode || 'before-end',
                exitDelayFrames: exitDelayFrames !== undefined ? Number(exitDelayFrames) : 0,
                customLogo: customLogo || undefined,
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
                cmd = `npx remotion render src/index.ts "${sceneId}" "${outPath}" ${framesFlag} --codec=prores --prores-profile=4444 --pixel-format=yuva444p10le --image-format=png --props="${propsFile}"`;
              } else {
                // Standart H264 MP4
                cmd = `npx remotion render src/index.ts "${sceneId}" "${outPath}" ${framesFlag} --props="${propsFile}"`;
              }

              console.log(`[Remotion API] Render başlatıldı: ${sceneId} -> ${filename}`);

              // Child process spawn & gerçek zamanlı SSE ilerleme akışı
              const child = spawn(cmd, {
                cwd: process.cwd(),
                shell: true,
              });

              let currentPercent = 0;
              let stderrData = '';
              let ended = false;

              const sendEvent = (event: string, data: object) => {
                if (ended || res.writableEnded) return;
                res.write(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`);
                if (typeof (res as unknown as { flush?: () => void }).flush === 'function') {
                  (res as unknown as { flush: () => void }).flush();
                }
              };

              res.writeHead(200, {
                'Content-Type': 'text/event-stream',
                'Cache-Control': 'no-cache, no-transform',
                'Connection': 'keep-alive',
                'X-Accel-Buffering': 'no',
              });

              sendEvent('progress', {
                percent: 0,
                stage: 'start',
                message: 'Render başlatılıyor...',
              });

              const handleChunk = (chunk: Buffer | string) => {
                const text = chunk.toString();
                const lines = text.split(/[\r\n]+/);

                for (const line of lines) {
                  const trimmed = line.trim();
                  if (!trimmed) continue;

                  // 1. Paketleme (Bundling 0% - 100%) -> %0 - %15
                  const bundleMatch = trimmed.match(/Bundling\s+(\d+)%/i);
                  if (bundleMatch) {
                    const bundlePct = parseInt(bundleMatch[1], 10);
                    const mapped = Math.min(15, Math.round(bundlePct * 0.15));
                    if (mapped >= currentPercent) {
                      currentPercent = mapped;
                      sendEvent('progress', {
                        percent: currentPercent,
                        stage: 'bundling',
                        message: `Paketleniyor: %${bundlePct}`,
                      });
                    }
                    continue;
                  }

                  // 2. Kareler işleniyor (Rendered X/Y) -> %15 - %85
                  const renderMatch = trimmed.match(/Rendered\s+(\d+)\/(\d+)(?:,\s*time remaining:\s*([^,\n\r]+))?/i);
                  if (renderMatch) {
                    const current = parseInt(renderMatch[1], 10);
                    const total = parseInt(renderMatch[2], 10);
                    const timeRem = renderMatch[3]?.trim();
                    const framePct = Math.round((current / (total || 1)) * 100);
                    const mapped = 15 + Math.round((current / (total || 1)) * 70);
                    if (mapped >= currentPercent) {
                      currentPercent = Math.min(85, mapped);
                      const remText = timeRem ? ` (${timeRem} kaldı)` : '';
                      sendEvent('progress', {
                        percent: currentPercent,
                        stage: 'rendering',
                        message: `Kareler işleniyor: %${framePct} (${current}/${total})${remText}`,
                      });
                    }
                    continue;
                  }

                  // 3. Birleştirme (Stitched X/Y) -> %85 - %99
                  const stitchMatch = trimmed.match(/Stitched\s+(\d+)\/(\d+)/i);
                  if (stitchMatch) {
                    const current = parseInt(stitchMatch[1], 10);
                    const total = parseInt(stitchMatch[2], 10);
                    const stitchPct = Math.round((current / (total || 1)) * 100);
                    const mapped = 85 + Math.round((current / (total || 1)) * 14);
                    if (mapped >= currentPercent) {
                      currentPercent = Math.min(99, mapped);
                      sendEvent('progress', {
                        percent: currentPercent,
                        stage: 'stitching',
                        message: `Video derleniyor: %${stitchPct} (${current}/${total})`,
                      });
                    }
                    continue;
                  }
                }
              };

              child.stdout?.on('data', handleChunk);
              child.stderr?.on('data', (d) => {
                stderrData += d.toString();
                handleChunk(d);
              });

              child.on('close', (code) => {
                try {
                  if (fs.existsSync(propsFile)) {
                    fs.unlinkSync(propsFile);
                  }
                } catch {
                  // ignore
                }

                if (code === 0) {
                  console.log(`[Remotion API] Render tamamlandı: ${filename}`);
                  sendEvent('progress', {
                    percent: 100,
                    stage: 'complete',
                    message: 'Video başarıyla tamamlandı! (%100)',
                  });
                  sendEvent('done', {
                    success: true,
                    downloadUrl: `/out/${filename}`,
                    filename,
                    percent: 100,
                  });
                  ended = true;
                  res.end();
                } else {
                  console.error('[Remotion API Hatası]:', stderrData || `Exit code ${code}`);
                  sendEvent('error', {
                    error: `Render işlemi tamamlanamadı (kod: ${code})`,
                    details: stderrData,
                  });
                  ended = true;
                  res.end();
                }
              });

              child.on('error', (err) => {
                console.error('[Remotion API Hata]:', err.message);
                sendEvent('error', {
                  error: err.message,
                });
                ended = true;
                res.end();
              });

              res.on('close', () => {
                if (!ended && !res.writableEnded) {
                  if (!child.killed) {
                    try {
                      child.kill();
                    } catch {
                      // ignore
                    }
                  }
                }
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
}

function remotionRenderPlugin(): Plugin {
  return {
    name: 'remotion-render-api',
    configureServer(server) {
      registerRenderMiddlewares(server);
    },
    configurePreviewServer(server) {
      registerRenderMiddlewares(server);
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
