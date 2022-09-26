import NotesList from "./components/NotesList";
import Search from "./components/Search";
import Header from "./components/Header";
import React, { useEffect, useState } from "react";

function App() {
    const [searchText, setSearchText] = useState("");
    const [darkMode, setDarkMode] = useState(false);

    const [notes, setNotes] = useState([
        {
            id: 1,
            date: "29/10/1990",
            text: "lets go"
        },
        {
            id: 2,
            date: "29/10/1990",
            text: "this notes was create at"
        },
        {
            id: 3,
            date: "29/10/1990",
            text: "go ahead"
        },
        {
            id: 4,
            date: "29/10/1990",
            text: "super note"
        }
    ]);
    useEffect(() => {
        localStorage.setItem("react-notes", JSON.stringify(notes));
    }, [notes]);

    useEffect(() => {
        const savedNotes = JSON.parse(localStorage.getItem("react-notes"));

        if (savedNotes) {
            setNotes(savedNotes);
        }
    }, []);

    const addNote = text => {
        const date = new Date();
        const newNote = {
            id: Math.random(200000000),
            text: text,
            date: date.toLocaleDateString()
        };
        const newNotes = [...notes, newNote];
        setNotes(newNotes);
    };

    const handleDeleteNote = id => {
        const newNotes = notes.filter(note => note.id !== id);
        // localStorage.removeItem("react-note");
        setNotes(newNotes);
    };

    return (
        <div className={`${darkMode && "dark-mode"}`}>
            <div className="container">
                <Header handleToggleDarkMode={setDarkMode} />
                <Search handleSearchNote={setSearchText} />
                <NotesList
                    notes={notes.filter(note =>
                        note.text.toLowerCase().includes(searchText)
                    )}
                    handleAddNote={addNote}
                    handleDeleteNote={handleDeleteNote}
                />
            </div>
        </div>
    );
}

export default App;
