// Importing react and boostrap elements

import React from "react"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

// Class projects below
class Projects extends React.Component {
    constructor(props) {
        super(props);

        // State props below to store data
        this.state = {
            projects: [], 
            idDelete: "",
            inputId: "",
            inputTitle: "",
            inputDescription: "",
            inputUrl: "",
            addTitle: "",
            addDescription: "",
            addUrl: ""
        }

        // State props to store functions state
        this.getInfo = this.getInfo.bind(this);
        this.addInfo = this.addInfo.bind(this);
        this.editInfo = this.editInfo.bind(this);
        this.monitorInfo = this.monitorInfo.bind(this);
        this.deleteInfo = this.deleteInfo.bind(this);
    }

    // getInfo function to fetch information from API
    getInfo() {
        fetch("/api")
        .then((data) => data.json())
        .then((result) => {
            this.setState({
                projects: result,
            })
        } , (err) => {
            console.log(err) 
        });
    }

    // Same function as before "getInfo" but trigger when page opens
    componentDidMount() {
        fetch("/api")
        .then((data) => data.json())
        .then((result) => {
            this.setState({
                projects: result,
            })
        } , (err) => {
            console.log(err) 
        });
    }
    
    // function that monitors state information from inputs
    monitorInfo(e) {
        const input = e.target.id;
        const value = e.target.value;

        if (input === "add1") {
            this.setState({
                addTitle: value
            });
        } else if (input === "add2") {
            this.setState({
                addDescription: value
            });
        } else if (input === "add3") {
            this.setState({
                addUrl: value
            });

        } else if (input === "input1") {
            this.setState({
                inputId: value
            });
        } else if (input === "input2") {
            this.setState({
                inputTitle: value
            });
        } else if (input === "input3") {
            this.setState({
                inputDescription: value
            });
        } else if (input === "input4") {
            this.setState({
                inputUrl: value
            });
        } else {
            this.setState({
                idDelete: value
            });
        }
        
    }

    // add info function that posts an additional project at the bottom of the list
    addInfo() {
        let project = {
            title: this.state.addTitle,
            description: this.state.addDescription,
            URL: this.state.addUrl
        }
            fetch('/projects', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(project)
    
            })
            .then((data) => data.json())
            .then((result) => {
                console.log(result);
                this.setState({
                    projects: result
                })
            } , (err) => {
                console.log(err) 
            });
            this.getInfo();
        }

    // function to edit information by id
    editInfo() {
        let id = Number(this.state.inputId);
        let project = {
            id: this.state.inputId,
            title: this.state.inputTitle,
            description: this.state.inputDescription,
            URL: this.state.inputUrl
        }
        let projects = this.state.projects;
        let ids= [];
        for (let i = 0; i < projects.length; i++) {
            ids.push(Number(i));
        }

        // if statement to check if id exists. 
        if (ids.indexOf(id-1) > -1) {
            fetch('/projects', {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(project)
    
            })
            .then((data) => data.json())
            .then((result) => {
                this.setState({
                    projects: result
                })
            } , (err) => {
                console.log(err) 
            });
        } else {
            console.log("project does not exist")
        }
        this.getInfo();
        }

        // delete function by id
        deleteInfo() {
            let id = {
                id: Number(this.state.idDelete)
            }
            fetch('/delete', {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(id)
    
            })
            .then((data) => data.json())
            .then((result) => {
                console.log(result);
                this.setState({
                    projects: result
                })
                window.location.reload()
            } , (err) => {
                console.log(err) 
            });
            this.getInfo();
        }

    render() {
        return (

            // Displaying projects below with .map
            <div className="container">
                <h4>Projects</h4>
                <div className="projects">
                    {this.state.projects?.map((project, index) =>
                    <div id={index+1} className="project">
                    <p style={{fontSize:"bold"}}>{project.id}</p>
                    <p>Title: {project.title}</p>
                    <p>Description: {project.description}</p>
                    <p><Button className="p" variant="link" href={project.URL} >Link: {project.URL}</Button></p>
                    </div>
                    )}
                </div>

                {/* Button to update information */}
                <Button style={{margin:"1rem"}} type="button" onClick={this.getInfo}>Get Latest Information</Button>

                {/* Section to add new project */}
                <h4>Add a new project by filling all the boxes and clicking on the submit button</h4>
                <div className="controls">
                <Form.Control className="input" type="text" id="add1" placeholder="Enter title" value={this.state.addTitle} onChange={this.monitorInfo} />
                <Form.Control className="input" type="text" id="add2" placeholder="Enter description" value={this.state.addDescription} onChange={this.monitorInfo} />
                <Form.Control className="input" type="text" id="add3" placeholder="Enter URL" value={this.state.addUrl} onChange={this.monitorInfo} />
                <Button variant="primary" type="button" onClick={this.addInfo}>Add project</Button>
                </div>

                {/* Section to edit an existin project */}
                <h4>Edit a project by ID. Only fill in the information you wish to edit</h4>
                <div className="controls">
                <Form.Control className="input" type="text" id="input1" placeholder="Enter ID" value={this.state.inputId} onChange={this.monitorInfo} />
                <Form.Control className="input" type="text" id="input2" placeholder="Enter title" value={this.state.inputTitle} onChange={this.monitorInfo} />
                <Form.Control className="input" type="text" id="input3" placeholder="Enter description" value={this.state.inputDescription} onChange={this.monitorInfo} />
                <Form.Control className="input" type="text" id="input4" placeholder="Enter URL" value={this.state.inputUrl} onChange={this.monitorInfo} />
                <Button variant="success" type="button" onClick={this.editInfo}>Update Information</Button>
                </div>

                {/* Section to delete an existing project */}
                <h4>Delete project by ID</h4>
                <div className="controls">
                <Form.Control className="input" type="text" id="input5" placeholder="Enter ID" value={this.state.idDelete} onChange={this.monitorInfo} />
                <Button variant="danger" style={{margin:"1rem"}} type="button" onClick={this.deleteInfo}>Delete Project</Button>
                </div>
            </div>
        )
    }
}

export default Projects;

// Got help from the lecture