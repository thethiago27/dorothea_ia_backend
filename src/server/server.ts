import fastify from 'fastify'
import cors from '@fastify/cors'

import { routes } from '../routes'
import prismaPlugin from '../plugins/prisma'
import mixpanelPlugin from '../plugins/mixpanel'
import schemaValidation from '../plugins/schema-validation'
import spotifyTokenPlugin from '../plugins/spotify-token'

const app = fastify()

app.register(prismaPlugin)
app.register(spotifyTokenPlugin)
app.register(mixpanelPlugin)
app.register(schemaValidation)
app.register(routes)

app.register(cors, {
  origin: ['https://carbonoempregos.com.br', 'http://localhost:3000'],
  credentials: true,
})

export const createServer = async () => {
  try {
    app.listen({ port: 3001 }, (err, address) => {
      if (err) {
        console.error(err)
        process.exit(1)
      }
      console.log(`Server listening at ${address}`)
    })
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}