import React from 'react'
import './Kanban.css'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import ReactModal from 'react-modal'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { connect } from 'react-redux'
import { incColId, addCol, delCol, newKan} from '../../actions'


class Kanban extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: "GJB Kanban",
            showModal: false,
            colCount: 2,
            showInstructions: false
        }

        this.handleAdd = this.handleAdd.bind(this);
        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.handleNew = this.handleNew.bind(this);
        this.handleChangeTempName = this.handleChangeTempName.bind(this);
        this.handleOpenInstructions = this.handleOpenInstructions.bind(this);
        this.handleCloseInstructions = this.handleCloseInstructions.bind(this);
    }

    handleOpenInstructions(){
        this.setState({showInstructions: true});
    }

    handleCloseInstructions(){
        this.setState({showInstructions: false});
    }

    handleNew(){
        this.props.newKan();
    }

    handleAdd() {
        this.props.addCol(this.state.colCount);
        this.setState({colCount: this.state.colCount + 1})
    }

    handleChangeName() {
        this.setState({name: this.state.tempName});
    }

    handleChangeTempName(event) {
        this.setState({tempName: event.target.value});
    }

    handleOpenModal() {
        this.setState({ showModal: true });
    }

    handleCloseModal() {
        this.setState({ showModal: false });
    }

    renderCols() {
        return this.props.KanbanColumns.map((col) => {
            return (
                <Col>
                    {col}
                </Col>
            )
        })
    }

    render() {
        console.log(this.props);
        return (
            <div className='kanban'>
                <div className="kanbanheader">
                    <Container>
                        <Row>
                            <Col><h1>{this.state.name}</h1></Col>
                            <Col md="auto">
                                <DropdownButton id="dropdown-basic-button" title="More">
                                    <Dropdown.Item onClick={this.handleNew}>New</Dropdown.Item>
                                    <Dropdown.Item onClick={this.handleAdd}>Add Column</Dropdown.Item>
                                    <Dropdown.Item onClick={this.handleOpenModal}>Change Name</Dropdown.Item>
                                </DropdownButton>
                            </Col>
                            <Col md="auto" >
                                <Button onClick={this.handleOpenInstructions}>Help</Button>
                            </Col>
                        </Row>
                    </Container>
                </div>

                <div className="kanbanBody">
                    <Container>
                        <Row>
                            {this.renderCols()}
                        </Row>
                    </Container>
                </div>


                <ReactModal
                    isOpen={this.state.showModal}
                    contentLabel="Minimal Modal Example"
                >
                    <Form>
                        <Form.Group controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Please enter new name here</Form.Label>
                            <Form.Control as="textarea" rows="1" placeholder={this.state.name} onChange={this.handleChangeTempName} />
                        </Form.Group>
                    </Form>
                    <button onClick={this.handleChangeName}>Save</button>
                    <button onClick={this.handleCloseModal}>Close</button>
                </ReactModal>

                <ReactModal
                    isOpen={this.state.showInstructions}
                    contentLabel="Kanban Instructions"
                >
                    <Container>
                        <Row text-align="center"><h2>Welcome to GJB Kanban!</h2></Row>
                        <br/>
                        <Row>
                            <Col><h3>What is a kanban?</h3></Col>
                            <Col><p>Kanban is a popular framework used to implement agile software development. It requires real-time
                                 communication of capacity and full transparency of work. Work items are represented visually on a kanban
                                  board, allowing team members to see the state of every piece of work at any time.</p></Col>
                        </Row>
                        <Row>
                            <Col><h3>How do I create a new Kanban?</h3></Col>
                            <Col><p>Easy! Go to the top right corner of the screen and click "More". There you can click "New"
                                everything will be cleared for you!</p></Col>
                        </Row>
                        <Row>
                            <Col><h3>How do I change the name of my Kanban?</h3></Col>
                            <Col><p>To change the name of your kanban, click "More" in the top right corner of the screen and then click "Change
                                Name". From there you will be promted to choose a new name for your Kanban! Once you have put in a new name,
                                simply click save and you're all set!</p></Col>
                        </Row>
                        <Row>
                            <Col><h3>How do I create new columns and cards?</h3></Col>
                            <Col><p>To create a new column, select "More" in the top right corner of the screen and then select "Add Column".
                                Afterwards, once you have a column in your Kanban, click "Add card" at the top of the column and new card will 
                                be added!</p></Col>
                        </Row>
                        <Row>
                            <Col><h3>How do I modify my columns and cards?</h3></Col>
                            <Col><p>In order to modify your columns, simply click the dropdown button next to "Add card" at the top of 
                                the column you want to modify and click "Settings". From there you can change the name and background
                                color of the column. The same can be done with cards by clicking "Options" at the top right corner of the
                                card you want to modify and you can also change it's priority!</p></Col>
                        </Row>
                        <Row>
                            <Col><h3>I have too many columns, how do I delete one?</h3></Col>
                            <Col><p>No problem! In order to delete one of your columns, just click on the dropdown button in the top
                                right corner of the column you want to delete and then click "Delete Column"!</p></Col>
                        </Row>
                    </Container>


                    <button onClick={this.handleCloseInstructions}>Close</button>
                </ReactModal>
            </div>

        )
    }
}

const mapStateToProps = (state) => {
    console.clear();
    console.log(state);

    return {KanbanColumns: state.columns};
}
export default connect(
    mapStateToProps, 
    { incColId, addCol, delCol, newKan}
)(Kanban);