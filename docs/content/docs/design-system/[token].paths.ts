import fs from 'fs'

const tokensPath = new URL(
  '../../../../packages/core/src/styles/tokens.css',
  import.meta.url,
)
const tokensCss = fs.readFileSync(tokensPath, 'utf8')

function parseVarsFromBlock(selector: string): Record<string, string> {
  const escaped = selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const match = tokensCss.match(new RegExp(`${escaped}\\s*\\{([\\s\\S]*?)\\}`))
  if (!match) return {}
  const vars: Record<string, string> = {}
  for (const line of match[1].split('\n')) {
    const trimmed = line.trim()
    if (!trimmed.startsWith('--') || !trimmed.includes(':')) continue
    const [name, ...valueParts] = trimmed.replace(/;$/, '').split(':')
    vars[name.trim()] = valueParts.join(':').trim()
  }
  return vars
}

const rootVars = parseVarsFromBlock(':root')

function groupedClassTokens(
  varPrefix: string,
  classPrefix: string,
): { name: string; value?: string }[] {
  const tokens = Object.keys(rootVars)
    .filter((key) => key.startsWith(varPrefix))
    .map((key) => ({
      className: `${classPrefix}${key.slice(varPrefix.length)}`,
      value: rootVars[key],
    }))
    .sort((a, b) => a.className.localeCompare(b.className))

  const grouped: { name: string; value?: string }[] = []
  let previousGroup = ''
  for (const token of tokens) {
    const group = token.className.split('-')[2] || token.className
    if (group !== previousGroup) {
      grouped.push({ name: group })
      previousGroup = group
    }
    grouped.push({ name: token.className, value: token.value })
  }
  return grouped
}

const bgColors = groupedClassTokens('--surface-', 'bg-surface-')
const txtColors = groupedClassTokens('--ink-', 'text-ink-')
const borderColors = groupedClassTokens('--outline-', 'border-outline-')

const fontSize = [
  ['2xs', ['11px', { lineHeight: '1.15', letterSpacing: '0.01em', fontWeight: '420' }]],
  ['xs', ['12px', { lineHeight: '1.15', letterSpacing: '0.02em', fontWeight: '420' }]],
  ['sm', ['13px', { lineHeight: '1.15', letterSpacing: '0.02em', fontWeight: '420' }]],
  ['base', ['14px', { lineHeight: '1.15', letterSpacing: '0.02em', fontWeight: '420' }]],
  ['lg', ['16px', { lineHeight: '1.15', letterSpacing: '0.02em', fontWeight: '400' }]],
  ['xl', ['18px', { lineHeight: '1.15', letterSpacing: '0.01em', fontWeight: '400' }]],
  ['2xl', ['20px', { lineHeight: '1.15', letterSpacing: '0.01em', fontWeight: '400' }]],
  ['p-2xs', ['11px', { lineHeight: '1.6', letterSpacing: '0.01em', fontWeight: '420' }]],
  ['p-xs', ['12px', { lineHeight: '1.6', letterSpacing: '0.02em', fontWeight: '420' }]],
  ['p-sm', ['13px', { lineHeight: '1.5', letterSpacing: '0.02em', fontWeight: '420' }]],
  ['p-base', ['14px', { lineHeight: '1.5', letterSpacing: '0.02em', fontWeight: '420' }]],
  ['p-lg', ['16px', { lineHeight: '1.5', letterSpacing: '0.02em', fontWeight: '400' }]],
  ['p-xl', ['18px', { lineHeight: '1.42', letterSpacing: '0.01em', fontWeight: '400' }]],
  ['p-2xl', ['20px', { lineHeight: '1.38', letterSpacing: '0.01em', fontWeight: '400' }]],
  ['p-3xl', ['24px', { lineHeight: '1.2', letterSpacing: '0.005em', fontWeight: '400' }]],
].map(([name, value]) => ({ name, value }))

const fontWeight = [
  ['normal', 400],
  ['medium', 500],
  ['semibold', 600],
  ['bold', 700],
].map(([name, value]) => ({ name, value }))

const letterSpacing = [
  ['normal', '0em'],
  ['tight', '-0.025em'],
  ['wide', '0.025em'],
  ['wider', '0.05em'],
].map(([name, value]) => ({ name, value }))

const lineHeight = [
  ['none', '1'],
  ['tight', '1.25'],
  ['snug', '1.375'],
  ['normal', '1.5'],
  ['relaxed', '1.625'],
  ['loose', '2'],
].map(([name, value]) => ({ name, value }))

const borderRadius = [
  ['sm', '0.25rem'],
  ['DEFAULT', '0.5rem'],
  ['md', '0.625rem'],
  ['lg', '0.75rem'],
  ['xl', '1rem'],
  ['2xl', '1.25rem'],
  ['full', '9999px'],
].map(([name, value]) => ({ name, value }))

export default {
  paths() {
    return [
      { params: { token: 'background-color', data: bgColors } },
      { params: { token: 'text-color', data: txtColors } },
      { params: { token: 'border-color', data: borderColors } },
      {
        params: {
          token: 'text',
          data: { fontSize, fontWeight, letterSpacing, lineHeight, txtColors },
        },
      },
      { params: { token: 'drop-shadow' } },
      { params: { token: 'border-radius', data: borderRadius } },
    ]
  },
}
