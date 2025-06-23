import fs from 'fs'
import fetchTogglData from './utils/fetch.js'

async function generateCard() {
  const projects = await fetchTogglData()

  const svg = `
  <svg width="450" height="${100 + projects.length * 30}" viewBox="0 0 450 ${100 + projects.length * 30}" xmlns="http://www.w3.org/2000/svg">
    <style>
      .header { font: bold 18px 'Segoe UI', sans-serif; fill: #58a6ff; }
      .project { font: 14px 'Segoe UI', sans-serif; fill: #333; }
      .bg { fill: #f6f8fa; rx: 10; }
    </style>
    <rect width="100%" height="100%" class="bg" rx="10"/>
    <text x="20" y="30" class="header">⏱️ Toggl Track Stats</text>
    ${projects.map((project, i) => `
    <text x="20" y="${60 + i * 30}" class="project">
      • ${project.name}: ${project.hours}h
    </text>
    `).join('')}
    <text x="20" y="${50 + projects.length * 30}" class="project" font-size="12px">
      Обновлено: ${new Date().toLocaleDateString()}
    </text>
  </svg>
  `

  fs.writeFileSync('toggl-stats.svg', svg)
  console.log('✅ SVG сгенерирован!')
}

generateCard()
