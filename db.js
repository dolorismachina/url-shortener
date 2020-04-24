const { Pool } = require('pg')
const randomString = require('randomstring')

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || process.env.DATABASE_URL_DEV,
  ssl: true
})


const queries = {
  retrieveTarget: async (shortUrl) => {
    console.log(shortUrl)
    try {
      const query = {
        text: 'SELECT target FROM links WHERE url = $1',
        values: [shortUrl]
      }
      const result = await pool.query(query)
      return result.rows[0].target
    }
    catch (err) {
      throw err
    }
  },

  insertTarget: async (targetUrl) => {
    try {
      const values = {
        target: targetUrl,
        url: randomString.generate({
          length: 8,
          readable: true
        })
      }

      const query = {
        text: `INSERT INTO links(target, url) VALUES($1, $2) RETURNING *`,
        values: [values.target, values.url]
      }
      return await pool.query(query)
    }
    catch (err) {
      throw err
    }
  }
}

module.exports = queries
