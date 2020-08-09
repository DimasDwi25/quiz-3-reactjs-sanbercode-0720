import React, { useState, useEffect } from 'react'
import axios from "axios"

const Movie = () => {

    // inisialiasi useState
    const [dataMovie, setDataMovie] = useState(null)
    const [input, setInput] = useState({ title: "", year: "", duration: "", genre: "", rating: "", description: "" })
    const [selectedId, setSelectedId] = useState(0)
    const [statusForm, setStatusForm] = useState("create")

    useEffect(() => {
        if (dataMovie === null) {
            axios.get(`http://backendexample.sanbercloud.com/api/movies`)
                .then(res => {
                    setDataMovie(
                        res.data.map(el => {
                            return { id: el.id, name: el.name, title: el.title, description: el.description, year: el.year, duration: el.duration, genre: el.genre, rating: el.rating }
                        }))
                })
        }
    }, [dataMovie])

    return(
        <>
        <div className="container bg-white py-5">
            <section className="mt-50">
                <h1 className="title-section">List Movie Editor</h1>
                <table className="table-list-movies">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Judul</th>
                            <th>Deskripsi</th>
                            <th>Rating</th>
                            <th>Durasi</th>
                            <th>Genre</th>
                            <th>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            dataMovie !== null && dataMovie.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{item.title}</td>
                                        <td>{item.description}</td>
                                        <td>{item.rating}</td>
                                        <td>{item.duration / 60} jam</td>
                                        <td>{item.genre}</td>
                                    </tr>
                                    )
                                })
                            }
                        </tbody>
                </table>
            </section>
        </div>
        
        </>
    )
}

export default Movie