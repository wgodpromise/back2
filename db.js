import { get } from "node:http";

let idCounter = 0;
export const notes = [
    {
        id: 1,
        title: 'Сдать отчет',
        tag: 4,
        updatedAt: new Date().toDateString()
    },
    {
        id: 2,
        title: 'Сдать отчет',
        tag: 4,
        updatedAt: new Date().toDateString()
    },
]
function getMaxId() {
    for (let note of notes) {
        if (note.id > idCounter) {
            idCounter = note.id
        }
    }
    idCounter++
}
const tags = [
    {
        id: 1,
        title: 'Все'
    },
    {
        id: 2,
        title: 'Идеи'
    },
    {
        id: 3,
        title: 'Личное'
    },
    {
        id: 4,
        title: 'Работа'
    }
]

getMaxId()

export function getAllNotes() {
    return notes;
}

export function addNote(dto) {
    const newNote = {
        id: idCounter++,
        title: dto.title,
        tag: dto.tag,
        updatedAt: new Date().toDateString(),
    }
    notes.push(newNote);
    return newNote;
}

export function deleteNotes(id) {
    const index = notes.findIndex(note => note.id === id);
    if (index === -1) {
        return null;
        return false
    }
    notes.splice(index, 1);
    return true;
}