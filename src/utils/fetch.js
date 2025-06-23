import axios from 'axios'
import { Buffer } from 'buffer'

const TOGGL_API_KEY = process.env.TOGGL_API_KEY
const WORKSPACE_ID = process.env.WORKSPACE_ID

export default async () => {
  const today = new Date()
  const firstDay = new Date(today.getFullYear(), today.getMonth(), 1)
  // const response = await axios.get('https://api.track.toggl.com/api/v9/me', {
  //   headers: {
  //     "Authorization": `Basic ${base64.encode(0e4455976494c62d301f2c096d30c575:api_token)}`
  //   },
  // })
  // console.log(response)
  // return response
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

// fetchToggleData(0e4455976494, 9097298, volkovaanastasia301, Triada180696)

// curl -u "0e4455976494c62d301f2c096d30c575:api_token" \
//   -H "User-Agent: volkovaanastasia301@gmail.com" \
//   https://api.track.toggl.com/api/v9/me