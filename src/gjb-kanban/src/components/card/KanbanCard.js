import React from 'react'
import './KanbanCard.css'
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ReactModal from 'react-modal'
import Button from 'react-bootstrap/Button'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'

class KanbanCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            newName: '',
            description: '',
            newDescription: '',
            priority: 'Normal',
            headerColor: {backgroundColor: 'gray'},
            showModal: true,
            hideDesc: false
        }

        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.handleHighP = this.handleHighP.bind(this);
        this.handleNormalP = this.handleNormalP.bind(this);
        this.handleLowP = this.handleLowP.bind(this);
        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleS = this.handleS.bind(this);
        this.handleHideDesc = this.handleHideDesc.bind(this);
    }
    handleS() {
        this.setState({ name: this.state.newName })
        this.setState({ description: this.state.newDescription })
        this.setState({ showModal: false })
    }

    handleChangeName(event) {
        this.setState({ newName: event.target.value });
    }

    handleDescriptionChange(event) {
        this.setState({ newDescription: event.target.value });
    }

    handleOpenModal() {
        this.setState({ showModal: true });
    }

    handleCloseModal() {
        this.setState({ newName: this.state.name })
        this.setState({ newDescription: this.state.description })
        this.setState({ showModal: false });
    }
    handleHighP() {
        this.setState({ priority: 'High' });
        this.setState({ headerColor: { backgroundColor: 'red' } });
    }

    handleNormalP() {
        this.setState({ priority: 'Normal' });
        this.setState({ headerColor: { backgroundColor: 'gray' } });
    }

    handleLowP() {
        this.setState({ priority: 'Low' });
        this.setState({ headerColor: { backgroundColor: 'yellow' } });
    }

    handleHideDesc() {
        this.setState({ hideDesc: !this.state.hideDesc });
    }

    render() {

        return (
            <div className="kanbanCard">
                <div className={this.state.hideDesc ? "kanbanCardHeader alone" : "kanbanCardHeader"} style={this.state.headerColor}>
                    <Container>
                        <Row>
                            <Col md="auto">
                                <Button onClick={this.handleHideDesc}><div className={this.state.hideDesc ? "triangle-right" : "triangle-down"}/></Button>
                            </Col>
                            <Col><h5>{this.state.name}</h5></Col>
                            <Col md="auto">
                                <Button onClick={this.handleOpenModal}>Options</Button>
                            </Col>
                        </Row>
                    </Container>
                </div>

                <div className="kanbanCardBody" hidden={this.state.hideDesc}>
                    <div >
                        <p className="descText">
                            {this.state.description}
                        </p>
                    </div>
                </div>

                <ReactModal
                    isOpen={this.state.showModal}
                    contentLabel="Column Name Change"
                >
                    <Form>
                        <Form.Group controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Name</Form.Label>
                            <Form.Control as="textarea" rows="1" value={this.state.newName} onChange={this.handleChangeName} />
                        </Form.Group>
                        <Form.Group controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea" rows="3" value={this.state.newDescription} onChange={this.handleDescriptionChange} />
                        </Form.Group>
                    </Form>
                    <br />

                    <DropdownButton id="card-Priority" title="Priority">
                        <Dropdown.Item onClick={this.handleHighP}>High</Dropdown.Item>
                        <Dropdown.Item onClick={this.handleNormalP}>Normal</Dropdown.Item>
                        <Dropdown.Item onClick={this.handleLowP}>Low</Dropdown.Item>
                    </DropdownButton>
                    <p>Current Priority: {this.state.priority} </p>


                    <button onClick={this.handleCloseModal}>Close</button>
                    <button onClick={this.handleS}>Save</button>
                </ReactModal>

            </div>
        )
    }
}

export default KanbanCard;