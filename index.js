import { ok } from 'node:assert';
import { createServer } from 'node:http';

const host = '127.0.0.1';
const port = 3000;

const notes = [
    {
        Id: 1,
        title: 'Сдать отчет',
        tag: 4,
        updatedAt: new Date().toDateString()
    },
    {
        Id: 1,
        title: 'Сдать отчет',
        tag: 4,
        updatedAt: new Date().toDateString()
    },
]

function parseData(req) {
    let body = [];
    let result
    req.on('data', chunk => body.push(chunk));
    req.on('end', () => {
        const buffer = Buffer.concat(body)
        const rawDataString = buffer.toString()
        console.log('rawDataString', rawDataString)
        const data = JSON.parse(rawDataString)
        result = data
    });
    return result
}

const server = createServer((req, res) => {
    if (req.url === '/notes' && req.method === 'GET') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(notes))
        return
    }

    if (req.url === '/notes' && req.method === 'POST') {
        const noteData = parseData(req)
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ status: 'ok' }))
        console.log('noteData', noteData)
        return
    }
});

server.listen(port, host, () => {
    console.log(`Server running at http://${host}:${port}`)
});