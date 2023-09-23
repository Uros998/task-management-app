import "./home-page.style.scss";
import * as Material from "@mui/material";
import {useEffect, useState} from "react";
import Card from "../../component/card/card"
import {getAllTasks, saveTask} from "../../services/task.service";


const statuses = [
    {
        value: '1',
        label: 'ToDo',
    },
    {
        value: '2',
        label: 'In progress',
    },
    {
        value: '3',
        label: 'Done',
    },

];


function HomePage() {

    const [data, setData] = useState([]);

    const [formData, setFormData] = useState({
        id: undefined,
        title: '',
        note: '',
        status: ''
    });

    const [open, setOpen] = useState(false);


    useEffect(() => {
        getAllTasks().then(setData);
    }, []);

    useEffect(() => {
        console.log("LIST",data);
    }, [data]);


    const handleSubmit = (event) => {
        event.preventDefault();
        const newStatus = statuses.find(s => s.value === formData.status)?.label;
        const newTask = {title: formData.title, note: formData.note, status: newStatus};

        // setData([...data, newTask]);
        saveTask(newTask)
            .then(saved =>  setData([...data, saved]))
            .catch(console.error)
            .finally(() => setFormData({id: undefined, title: "", note: "", status: ""}));
    };

    const deleteTask = (taskId) => {
        const newList = data.filter((task) => task.id !== taskId);
        setData(newList);
    }

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormData({...formData, [name]: value});
    };


    return (
        <>
            <div className="home-wrapper">
                <div className="home-title">
                    <h2>LISTA ZADATAKA</h2>
                </div>
                <div className="home-btn">
                    <Material.Button variant="contained" onClick={() => setOpen(true)} color="primary">
                        Dodaj novi zadatak
                    </Material.Button>
                </div>
                <div>
                    <Material.Dialog
                        open={open}
                        onClose={() => setOpen(false)}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                        fullWidth
                        maxWidth="sm"
                        className="dialog-wrapper"
                    >
                        <Material.DialogTitle id="alert-dialog-title" className="dialog-title">
                            <h2>Dodaj novi zadatak</h2>
                        </Material.DialogTitle>

                        <Material.DialogContent className="dialog-input">
                            <form onSubmit={handleSubmit}>

                                <Material.TextField id="outlined-basic"
                                                    name="title"
                                                    className="dialog-input"
                                                    label="Naziv"
                                                    value={formData.title}
                                                    onChange={handleChange}
                                                    variant="outlined"/>

                                <Material.TextField id="outlined-basic"
                                                    name="note"
                                                    className="dialog-input"
                                                    label="Opis"
                                                    value={formData.note}
                                                    onChange={handleChange}
                                                    variant="outlined"/>
                                <Material.TextField
                                    id="outlined-select-currency"
                                    select
                                    className="dialog-input"
                                    name="status"
                                    onChange={handleChange}
                                    label="Status"
                                    value={formData.status}
                                >
                                    {statuses.map((option) => (
                                        <Material.MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </Material.MenuItem>
                                    ))}
                                </Material.TextField>
                                <Material.Button type="submit" variant="outlined" color="success">
                                    Sačuvaj
                                </Material.Button>
                            </form>
                        </Material.DialogContent>

                    </Material.Dialog>
                </div>


                <div className="cards-wrapper">
                    {data.map((cardData) => (
                        <Card key={cardData.id}  data={cardData} deleteTask={deleteTask}/>
                    ))}
                </div>
            </div>
        </>
    )

}

export default HomePage;
