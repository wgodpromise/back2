import { ok } from 'node:assert';
import { createServer } from 'node:http';
import { getAllNotes, addNote, deleteNotes, updatedNote } from './db.js';
import { join } from 'node:path';


const host = '127.0.0.1';
const port = 3000;

const server = createServer((req, res) => {
    if (req.url === '/notes' && req.method === 'GET') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(getAllNotes()))
        return
    }

    if (req.url === '/notes' && req.method === 'PATCH') {
        let body = [];
        req.on('data', chunk => body.push(chunk));
        req.on('end', () => {
            const buffer = Buffer.concat(body)
            const rawDataString = buffer.toString()
            const data = JSON.parse(rawDataString)
            const result = updatedNote(data)
            if (!result) {
                res.statusCode = 400;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ status: 'Something wrong!' }));
                return;
            }

            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(result));
        });
        return
    }

    if (req.url === '/notes' && req.method === 'POST') {
        let body = [];
        req.on('data', chunk => body.push(chunk));
        req.on('end', () => {
            const buffer = Buffer.concat(body)
            const rawDataString = buffer.toString()
            const data = JSON.parse(rawDataString)
            const newNote = addNote(data)
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(newNote));
        });
        return
    }
    if (req.url === '/notes' && req.method === 'DELETE') {
        let body = [];
        req.on('data', chunk => body.push(chunk));
        req.on('end', () => {
            const buffer = Buffer.concat(body)
            const rawDataString = buffer.toString()
            const data = JSON.parse(rawDataString)
            const result = deleteNotes(data.id)
            if (!result) {
                res.statusCode = 400;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ status: 'Note not found' }));
                return;
            }
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ status: 'Note deleted successfully' }));
        });
        return
    }
    res.statusCode = 404;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ message: 'Not found' }));
});


server.listen(port, host, () => {
    console.log(`Server running at http://${host}:${port}`)
});