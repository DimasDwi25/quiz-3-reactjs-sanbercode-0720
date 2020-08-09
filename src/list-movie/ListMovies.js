import React, { useState, useEffect } from 'react'
import axios from "axios"

const ListMovie = () => {

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

    const handleEdit = (e) => {
        let idDataMovie = parseInt(e.target.value)
        let XMovie = dataMovie.find(x => x.id === idDataMovie)
        setInput(
            { title: XMovie.title, year: XMovie.year, duration: XMovie.duration, genre: XMovie.genre, rating: XMovie.rating, description: XMovie.description }
        )
        setSelectedId(idDataMovie)
        setStatusForm("edit")
    }

    const handleChange = (e) => {
        let typeOfInput = e.target.name
        switch (typeOfInput) {
            case "title":
                {
                    setInput({ ...input, title: e.target.value })
                    break
                }
            case "year":
                {
                    setInput({ ...input, year: e.target.value })
                    break
                }
            case "duration":
                {
                    setInput({ ...input, duration: e.target.value })
                    break
                }
            case "genre":
                {
                    setInput({ ...input, genre: e.target.value })
                    break
                }
            case "rating":
                {
                    setInput({ ...input, rating: e.target.value })
                    break
                }
            case "description":
                {
                    setInput({ ...input, description: e.target.value })
                    break
                }
            default:
                { break; }
        }
    }

    const handleDelete = (e) => {
        let idDataMovie = parseInt(e.target.value)
        let newDataMovie = dataMovie.filter(el => el.id !== idDataMovie)

        axios.delete(`http://backendexample.sanbercloud.com/api/movies/${idDataMovie}`)
            .then(res => {
                console.log(res);
            })
        setDataMovie([...newDataMovie])
    }

    const handleSubmit = (e) => {
        // menahan submit
        e.preventDefault()

        let title = input.title
        let genre = input.genre
        let year = input.year.toString()

        if (title.replace(/\s/g, '') !== "" && genre.replace(/\s/g, '') !== "" && year.replace(/\s/g, '') !== "") {
            if (statusForm === "create") {
                axios.post(`http://backendexample.sanbercloud.com/api/movies`, { title: input.title, year: input.year, duration: input.duration, genre: input.genre, rating: input.rating, description: input.description })
                    .then(res => {
                        setDataMovie([
                            ...dataMovie,
                            {
                                id: res.data.id,
                                title: input.title,
                                year: input.year,
                                duration: input.duration,
                                genre: input.genre,
                                rating: input.rating,
                                description: input.description
                            }])
                    })
            } else if (statusForm === "edit") {
                axios.put(`http://backendexample.sanbercloud.com/api/movies/${selectedId}`, { title: input.title, year: input.year, duration: input.duration, genre: input.genre, rating: input.rating, description: input.description })
                    .then(() => {
                        let XMovie = dataMovie.find(el => el.id === selectedId)
                        XMovie.title = input.title
                        XMovie.year = input.year
                        XMovie.duration = input.duration
                        XMovie.genre = input.genre
                        XMovie.rating = input.rating
                        XMovie.description = input.description
                        setDataMovie([...dataMovie])
                    })
            }

            setStatusForm("create")
            setSelectedId(0)
            setInput({ title: "", year: "", duration: "", genre: "", rating: "", description: "" })
        }
    }

    return (
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
                                            <td>
                                                <button onClick={handleEdit} value={item.id} className="btn-edit">Edit</button>
                                                &nbsp;
                                                <button onClick={handleDelete} value={item.id} className="btn-delete">Delete</button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </section>

                {/* form */}
                <div style={{ width: "50%", margin: "0 auto", display: "block" }}>
                    <div style={{ border: "1px solid #aaa", padding: "20px" }}>
                        <form onSubmit={handleSubmit}>
                            <label>Title : </label>
                            <input type="text" name="title" value={input.title} onChange={handleChange} className="c-form-control" />
                            <br />
                            <label>Genre : </label>
                            <input type="text" name="genre" value={input.genre} onChange={handleChange} className="c-form-control" />
                            <br />
                            <label>Tahun : </label>
                            <input type="text" name="year" value={input.year} onChange={handleChange} className="c-form-control" />
                            <br />
                            <label>Duration : </label>
                            <input type="text" name="duration" value={input.duration} onChange={handleChange} className="c-form-control" />
                            <br />
                            <label>Rating : </label>
                            <input type="number" name="rating" value={input.rating} onChange={handleChange} className="c-form-control" />
                            <br />
                            <label>Deskripsi : </label>
                            <textarea name="description" value={input.description} onChange={handleChange} className="c-form-control" />
                            <br />
                            <div style={{ width: "100%", paddingBottom: "20px" }}>
                                <button className="btn btn-primary">submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}


export default ListMovie