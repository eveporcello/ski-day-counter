const express = require('express')
const path = require('path')
const resorts = require('./resort-names.json')

const byName = name => resort =>
    name.toLowerCase() === resort.substr(0, name.length).toLowerCase()

const logger = (req, res, next) => {
    console.log(`${req.method} request for ${req.url}`)
    next()
}

const app = express()
    .use(logger)
    .use(express.static(path.join(__dirname, '../dist')))
    .get('/resorts', (req, res) =>
        res.status(200).json(resorts)
    )
    .get('/resorts/:name', (req, res) =>
        res.status(200).json(
            resorts.filter(byName(req.params.name))
        )
    )

app.listen(3000, () => 'Ski resort app running at http://localhost:3000')