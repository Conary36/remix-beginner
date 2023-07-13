//Utilites for reading and writing notes to the filesystem
import fs from 'fs/promises';

export async function getStoredNotes(){
    const rawFileContent = await fs.readFile('notes.json', {encoding: 'utf-8'});
    const data = JSON.parse(rawFileContent);
    const storedNotes = data.notes ?? []; // If data.notes is undefined, set storedNotes to an empty array
    return storedNotes;
}

export function storeNotes(notes){
    return fs.writeFile('notes.json', JSON.stringify({notes: notes || []})); 
}