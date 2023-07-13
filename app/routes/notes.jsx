import NewNote, {links as newNoteLinks } from '../components/NewNote';
import NoteList, { links as noteListLinks } from '../components/NoteList';
import { redirect } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { getStoredNotes, storeNotes } from '../data/notes';

export default function NotesPage() {
  const notes = useLoaderData(); // This is the data returned from the loader function
  //If a GET request reaches this route, this function will run
  return (
    <main>
      <NewNote />
      <NoteList  notes={notes}/>
    </main>
  );
}

export async function loader() {
  //Code in this loader will run on the client and server
  //This is triggered when the REQUEST reaches this route
  const notes = await getStoredNotes(); 
  return notes; // Return the notes from the file system
  //Remix also has another short way to return the notes data: return json(notes)  ---this must be imported from remix-run/node
  //The long way to return the notes data: return new Response(JSON.stringify(notes), {headers: {'Content-Type': 'application/json'}})
}

export async function action({request}){
  //Code in this action will only run on the server
  //and will not be downloaded on the client
  //This is triggered when the NON-REQUEST reaches this route
  const formData = await request.formData();
  const noteData = Object.fromEntries(formData); // extract data using built in Object.fromEntries() method
  //const noteData = {  
  // *****Common way of extracting data *********
  //   title: formData.get('title'),
  //   content: formData.get('content'),  
  // }
  /******VALIDATION COULD ALSO BE ADDED HERE*********/
  const existingNotes = await getStoredNotes();
  noteData.id = new Date().toISOString();
  const updatedNotes = existingNotes.concat(noteData);
  await storeNotes(updatedNotes);
  return redirect("/notes"); // Redirect to the notes page after the form is submitted
}

export function links() {
    return [...newNoteLinks(), ...noteListLinks()] // Page specific approach to CSS
}