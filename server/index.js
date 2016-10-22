const express = require('express')
const path = require('path')
const resorts = require('./resort-names.json')
const { port=3000, delay=0 } = require('minimist')(process.argv)
const cors = require('cors')

const byName = name => resort =>
name.toLowerCase() === resort.substr(0, name.length).toLowerCase()

const logger = (req, res, next) => {
    console.log(`${req.method} request for ${req.url}`)
    next()
}

const app = express()
    .use(logger)
    .use(cors())
    .use('/', express.static('./dist/img'))
    .get('/resorts', (req, res) =>
        res.status(200).json(resorts)
    )
    .get('/resorts/:name', (req, res) =>
        setTimeout(() =>
                res.status(200).json(
                    resorts.filter(byName(req.params.name))
                ),
            delay
        )
    )

app.listen(port, () => 'Ski resort app running at http://localhost:3000')