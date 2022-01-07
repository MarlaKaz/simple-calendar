
import express from 'express';
import { fileURLToPath } from 'url'
import { dirname } from 'path';

const app = express()
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename);

const port = process.env.PORT || 3000

app.listen(port)

console.log(__dirname)

app.use('/assets', express.static(__dirname + '/assets'))
// app.use(express.static('assets'))
// app.use('/style', express.static(__dirname + '/assets/style'))
// app.use('/script', express.static(__dirname + '/assets/script'))


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

const PSK = '61c321e2bc4d6569e93735ea';

