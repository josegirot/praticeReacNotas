import './App.css';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios'

const Header = () => {
    return ( <header><h1>NOTES</h1></header>)
}



const Nota = ({...note})=>{
    return (
        <li>
        <strong><p>{note.title}</p></strong >
        <p>{note.body}</p>
        </li>
    )
}

function App() {
    const [notes, setNotes]=useState([]);
    const [newNote,setNewNote]=useState("");

    useEffect(()=>{
        // fetch('http://jsonplaceholder.typicode.com/posts')
        // .then((response)=> response.json())
        // .then((json)=>{
        //     setNotes(json);
        // })
        axios.get('http://jsonplaceholder.typicode.com/posts')
        .then((response)=> {
            const {data}= response
            setNotes(data);
        })
    },[])

    const handleSubmit =(event)=>{
        event.preventDefault(); //evitamos que el navegador se refresque
        console.log('crear nota')
        const noteToAddToState = {
            "userId": 1,
            "title": "New note",
            "body": newNote
        }

        axios.post('http://jsonplaceholder.typicode.com/posts', noteToAddToState)
           .then((response)=>{
               const {data}=response
               setNotes([...notes,data])
           })
            setNewNote("");
     
    }
    const handleChange = (event)=>{
        setNewNote(event.target.value);
    }
    
    if (notes.length === 0){ return 'LOADING'};

    return ( <div className = "App">
         <Header></Header> 
        <ul>
             {notes.map((note) => {
                return (<Nota key={note.id} {...note}></Nota>)})
        } 
        </ul> 
        <form onSubmit={handleSubmit} method = "get">
        <input onChange={handleChange} value={newNote}/>
        <button>crear nota</button> 
        </form > 
         </div>
    )
}
// el ultimo  boton de un form por defecto es un submit 



export default App;