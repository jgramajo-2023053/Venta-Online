import { initServer } from './configs/app.js'
import { config } from 'dotenv'
import { connect } from './configs/mongo.js'
import { userDefault, categoryDeafult } from './configs/default.js'

config()
connect()
initServer()
userDefault()
categoryDeafult()