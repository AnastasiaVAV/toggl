// const fs = require('fs')
const axios = require('axios')

const TOGGL_API_KEY = process.env.TOGGL_API_KEY
const WORKSPACE_ID = process.env.WORKSPACE_ID

async function fetchTogglData() {
  const today = new Date()
  const firstDay = new Date(today.getFullYear(), today.getMonth(), 1)

  try {
    const response = await axios.get(
      `https://api.track.toggl.com/reports/api/v3/workspace/${WORKSPACE_ID}/summary`,
      {
        params: {
          since: firstDay.toISOString().split('T')[0],
          until: today.toISOString().split('T')[0],
        },
        headers: {
          'Authorization': `Basic ${Buffer.from(`${TOGGL_API_KEY}:api_token`).toString('base64')}`,
          'User-Agent': 'volkovaanastasia301@gmail.com', // Замените на ваш email
        },
      },
    )

    return response.data.groups.map(group => ({
      name: group.title,
      hours: (group.time / 3600000).toFixed(1),
    }))
  }
  catch (error) {
    console.error('Ошибка Toggl API:', error)
    return []
  }
}

module.exports = fetchTogglData
