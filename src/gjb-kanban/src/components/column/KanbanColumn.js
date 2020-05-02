import React from 'react'
import './KanbanColumn.css'
import KanbanCard from './../card/KanbanCard'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'
import SplitButton from 'react-bootstrap/SplitButton'
import Dropdown from 'react-bootstrap/Dropdown'
import Button from 'react-bootstrap/Button'
import ReactModal from 'react-modal'
import Form from 'react-bootstrap/Form'
import SketchPicker from 'react-color'
import { connect } from 'react-redux'
import { delCol, moveColLeft } from '../../actions'

class KanbanColumn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.id,
            name: this.props.name,
            newName: this.props.name,
            cards: [],
            divColor: {backgroundColor: 'gainsboro'},
            newColor: {backgroundColor: 'gainsboro'},
            showModal: false
        }

        this.handleAdd = this.handleAdd.bind(this);
        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.handleS = this.handleS.bind(this);
    }
    handleS() {
        this.setState({ name: this.state.newName })
        this.setState({ divColor: this.state.newColor })
        this.setState({ showModal: false })
    }
    handleAdd() {
        let cards = this.state.cards;
        cards.push(<KanbanCard />);
        this.setState({ cards: cards })
    }

    handleChangeName(event) {
        this.setState({newName: event.target.value});
    }

    handleOpenModal() {
        this.setState({ showModal: true });
    }

    handleCloseModal() {
        this.setState({ newName: this.state.name })
        this.setState({ newColor: this.state.divColor })
        this.setState({ showModal: false });
    }

    handleColorChange = (color) => {
        this.setState( {newColor: {backgroundColor: color.hex}})
    };

    render() {
        return (
            
                <div className="kanbanColumn">
                    <div className="columnheader" style={this.state.divColor}>
                        <Container>
                            <Row>
                                <Col><h4>{this.state.name}</h4></Col>
                                <Col md="auto">
                                    <SplitButton
                                        title={<strong>Add Card</strong>}
                                        onClick={this.handleAdd}
                                    >
                                        <Dropdown.Item onClick={this.handleOpenModal}>Settings</Dropdown.Item>
                                        <Dropdown.Item onClick={() => this.props.delCol(this.state.id)}>Delete Column</Dropdown.Item>
                                    </SplitButton>
                                </Col>
                            </Row>
                        </Container>
                    </div>
                    <div className="kanbanColumnBody" style={this.state.divColor}>
                        {this.state.cards}
                        
                    </div>

                    <ReactModal
                        isOpen={this.state.showModal}
                        contentLabel="Column Name Change"
                    >
                        <Form>
                            <Form.Group controlId="exampleForm.ControlTextarea1">
                                <Form.Label>Please enter new name here</Form.Label>
                                <Form.Control as="textarea" rows="1" value={this.state.newName} onChange={this.handleChangeName}/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Background colour: </Form.Label>
                                <SketchPicker color={ this.state.newColor.backgroundColor } onChange={ this.handleColorChange }/>
                            </Form.Group>
                        </Form>
                        <button onClick={this.handleCloseModal}>Close</button>
                        <button onClick={this.handleS}>Save</button>
                    </ReactModal>
                </div>
            
        )
    }
}

KanbanColumn.defaultProps = {
    name: 'Column'
}

const mapStateToProps = (state) => {
    console.log(state);
    return {cards: state.cards};
}

const mapDispatchToProps = dispatch => {
    return ({
        delCol: (id) => {
            dispatch(delCol(id))
        },
        moveColLeft: (id) => {
            dispatch(moveColLeft(id))
        }
    })
};

export default connect(
    mapStateToProps, mapDispatchToProps
) (KanbanColumn);