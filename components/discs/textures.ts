import * as THREE from 'three'
import type { Disc } from './data'

// Текстуры дисков рисуются на canvas в браузере: лицо — обложка с кольцевым текстом,
// оборот — бумажная этикетка с названием и описанием. Кэш — по id проекта.

const SIZE = 1024
const R = SIZE / 2
const HUB = 150   // прозрачная втулка
const HOLE = 76   // отверстие

const frontCache = new Map<string, THREE.CanvasTexture>()
const backCache = new Map<string, THREE.CanvasTexture>()
const imgCache = new Map<string, Promise<HTMLImageElement | null>>()

const DISPLAY = '"Oranienbaum", "Prata", Georgia, serif'
const BODY = '"Golos Text", "Manrope", system-ui, sans-serif'

let fontsReady: Promise<unknown> | null = null
function ensureFonts() {
  // Ждём шрифты не дольше 2,5 с: если сеть тянет, рисуем запасным — диски важнее
  fontsReady ??= Promise.race([
    Promise.all([
      document.fonts.load(`400 64px ${DISPLAY}`),
      document.fonts.load(`500 26px ${BODY}`),
      document.fonts.load(`600 26px ${BODY}`),
    ]),
    new Promise(r => setTimeout(r, 2500)),
  ]).catch(() => null)
  return fontsReady
}

function loadImage(src: string) {
  let p = imgCache.get(src)
  if (!p) {
    p = new Promise<HTMLImageElement | null>(resolve => {
      const im = new Image()
      im.onload = () => resolve(im)
      im.onerror = () => resolve(null)
      im.src = src
    })
    imgCache.set(src, p)
  }
  return p
}

function makeTexture(canvas: HTMLCanvasElement) {
  const t = new THREE.CanvasTexture(canvas)
  t.colorSpace = THREE.SRGBColorSpace
  t.anisotropy = 8
  t.needsUpdate = true
  return t
}

function hub(ctx: CanvasRenderingContext2D, light: boolean) {
  // прозрачная пластиковая втулка: почти невидимая, только два тонких кольца и лёгкий блик
  ctx.save()
  ctx.beginPath(); ctx.arc(R, R, HUB, 0, Math.PI * 2); ctx.arc(R, R, HOLE, 0, Math.PI * 2, true); ctx.clip()
  const g = ctx.createRadialGradient(R, R, HOLE, R, R, HUB)
  g.addColorStop(0, light ? 'rgba(255,255,255,0.55)' : 'rgba(255,255,255,0.42)')
  g.addColorStop(0.35, light ? 'rgba(255,255,255,0.22)' : 'rgba(255,255,255,0.16)')
  g.addColorStop(1, 'rgba(255,255,255,0.05)')
  ctx.fillStyle = g; ctx.fillRect(0, 0, SIZE, SIZE)
  ctx.restore()
  ctx.strokeStyle = 'rgba(40,36,30,0.28)'; ctx.lineWidth = 2
  ctx.beginPath(); ctx.arc(R, R, HUB, 0, Math.PI * 2); ctx.stroke()
  ctx.strokeStyle = 'rgba(255,255,255,0.55)'; ctx.lineWidth = 3
  ctx.beginPath(); ctx.arc(R, R, HOLE + 10, 0, Math.PI * 2); ctx.stroke()
  // отверстие
  ctx.globalCompositeOperation = 'destination-out'
  ctx.beginPath(); ctx.arc(R, R, HOLE, 0, Math.PI * 2); ctx.fill()
  ctx.globalCompositeOperation = 'source-over'
}

function ringText(ctx: CanvasRenderingContext2D, text: string, radius: number, startAngle: number, color: string, font: string, spacing = 1.9) {
  ctx.save()
  ctx.font = font
  ctx.fillStyle = color
  ctx.textBaseline = 'middle'
  ctx.textAlign = 'center'
  let angle = startAngle
  for (const ch of text) {
    const w = ctx.measureText(ch).width + spacing
    const a = angle + (w / 2) / radius
    ctx.save()
    ctx.translate(R + Math.cos(a) * radius, R + Math.sin(a) * radius)
    ctx.rotate(a + Math.PI / 2)
    ctx.fillText(ch, 0, 0)
    ctx.restore()
    angle += w / radius
  }
  ctx.restore()
}

function wrap(ctx: CanvasRenderingContext2D, text: string, maxWidth: number) {
  const words = text.split(' ')
  const lines: string[] = []
  let line = ''
  for (const w of words) {
    const test = line ? `${line} ${w}` : w
    if (ctx.measureText(test).width > maxWidth && line) { lines.push(line); line = w } else line = test
  }
  if (line) lines.push(line)
  return lines
}

export async function frontTexture(d: Disc): Promise<THREE.CanvasTexture> {
  const key = d.project.id
  const hit = frontCache.get(key)
  if (hit) return hit
  await ensureFonts()
  const img = await loadImage(d.art)
  const c = document.createElement('canvas'); c.width = c.height = SIZE
  const ctx = c.getContext('2d')!

  ctx.save()
  ctx.beginPath(); ctx.arc(R, R, R, 0, Math.PI * 2); ctx.clip()
  if (img) {
    const s = Math.max(SIZE / img.width, SIZE / img.height)
    const w = img.width * s, h = img.height * s
    ctx.drawImage(img, (SIZE - w) / 2, (SIZE - h) / 2, w, h)
  } else {
    ctx.fillStyle = d.hue; ctx.fillRect(0, 0, SIZE, SIZE)
    ctx.fillStyle = 'rgba(255,255,255,0.9)'; ctx.font = `400 88px ${DISPLAY}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
    wrap(ctx, d.project.title, 700).forEach((l, i, arr) => ctx.fillText(l, R, R + (i - (arr.length - 1) / 2) * 96 - 260))
  }
  // лёгкое затемнение края — как печать на диске
  const vg = ctx.createRadialGradient(R, R, R * 0.55, R, R, R)
  vg.addColorStop(0, 'rgba(0,0,0,0)'); vg.addColorStop(1, 'rgba(20,10,5,0.28)')
  ctx.fillStyle = vg; ctx.fillRect(0, 0, SIZE, SIZE)
  ctx.restore()

  // кольцевой текст по внешнему краю: название · стек · категория
  const ring = `${d.project.title}   ·   ${d.project.stack.slice(0, 2).join('  ·  ')}   ·   ${d.category.label}   ·   `.toUpperCase()
  ringText(ctx, ring, R - 46, -Math.PI * 0.82, 'rgba(255,252,245,0.92)', `600 24px ${BODY}`, 2.4)
  // марка над втулкой
  ctx.fillStyle = 'rgba(255,252,245,0.95)'; ctx.font = `400 58px ${DISPLAY}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
  ctx.fillText('АЮ', R, R - HUB - 44)
  // номер под втулкой
  ctx.font = `500 22px ${BODY}`; ctx.fillStyle = 'rgba(255,252,245,0.85)'
  ctx.fillText(`№ ${String(d.n).padStart(2, '0')}`, R, R + HUB + 40)

  hub(ctx, false)
  const t = makeTexture(c)
  frontCache.set(key, t)
  return t
}

export async function backTexture(d: Disc): Promise<THREE.CanvasTexture> {
  const key = d.project.id
  const hit = backCache.get(key)
  if (hit) return hit
  await ensureFonts()
  const c = document.createElement('canvas'); c.width = c.height = SIZE
  const ctx = c.getContext('2d')!

  ctx.save()
  ctx.beginPath(); ctx.arc(R, R, R, 0, Math.PI * 2); ctx.clip()
  ctx.fillStyle = '#ece9df'; ctx.fillRect(0, 0, SIZE, SIZE)
  // фактура бумаги
  for (let i = 0; i < 2600; i++) {
    ctx.fillStyle = `rgba(90,80,60,${Math.random() * 0.06})`
    ctx.fillRect(Math.random() * SIZE, Math.random() * SIZE, 2, 2)
  }
  // цветной обод категории
  ctx.strokeStyle = d.hue; ctx.lineWidth = 14
  ctx.beginPath(); ctx.arc(R, R, R - 7, 0, Math.PI * 2); ctx.stroke()
  ctx.restore()

  ctx.fillStyle = '#1f1c17'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
  // название — над втулкой
  ctx.font = `400 60px ${DISPLAY}`
  const titleLines = wrap(ctx, d.project.title, 640)
  const titleTop = R - HUB - 60 - (titleLines.length - 1) * 64
  titleLines.forEach((l, i) => ctx.fillText(l, R, titleTop + i * 64))
  ctx.font = `500 20px ${BODY}`; ctx.fillStyle = d.hue
  ctx.fillText(`${d.category.label.toUpperCase()}   ·   ${String(d.n).padStart(2, '0')}`, R, titleTop - 52)

  // описание — под втулкой, первые два предложения
  const desc = d.project.description.split(/(?<=[.!?])\s+/).slice(0, 2).join(' ')
  ctx.font = `500 25px ${BODY}`; ctx.fillStyle = '#3a352c'
  const lines = wrap(ctx, desc, 600).slice(0, 7)
  lines.forEach((l, i) => ctx.fillText(l, R, R + HUB + 40 + i * 34))
  // стек по кольцу
  ringText(ctx, `${d.project.stack.join('   ·   ')}   ·   `.toUpperCase(), R - 40, Math.PI / 2 + 0.3, '#6b6357', `600 21px ${BODY}`, 2.2)

  hub(ctx, true)
  const t = makeTexture(c)
  backCache.set(key, t)
  return t
}

export function warm(discs: Disc[]) {
  discs.forEach(d => { frontTexture(d); backTexture(d) })
}
