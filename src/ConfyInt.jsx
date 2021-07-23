import React from 'react';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Form from 'react-bootstrap/Form';

const mockStrings = {
    port: "cosa di hablare postugeise",
    ita: "cosini di habalre italiano",
    eng: "speaking english thing",
    esp: "cosa de hablar en español",
}

export default function ConfyInt(props) {
    const [isEditOpen, setIsEditOpen] = React.useState(false);
    const [strings, setStrings] = React.useState(mockStrings);

    if(process.env.NODE_ENV === "development") {
        return(
            <div>
                {props.children}
                <Button onClick={() => setIsEditOpen(true)}>E</Button>
                <EditStringModal 
                    label={props.label}
                    strings={strings}
                    setStrings={setStrings}
                    isOpen={isEditOpen}
                    setIsOpen={setIsEditOpen}
                />
            </div>)
    }
    else {
        return(props.children)
    }
}


function EditStringModal(props) {

    return(
        <Modal show={props.isOpen}>
            <Modal.Header>
                <Modal.Title>{props.label} used in {} places</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Tabs>
                    {Object.keys(props.strings).map((lang,i) => {
                        return (
                            <Tab id={i} eventKey={lang} title={lang}>
                                <Form>
                                    <Form.Control 
                                    as="textarea"
                                    value={props.strings[lang]}
                                    onChange={(e)=> {
                                        props.setStrings({...props.strings,[lang]:e.target.value})
                                    }}/>
                                </Form>
                            </Tab>)
                    })}
                </Tabs>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => props.setIsOpen(false)}>
                    Cancel
                </Button>
                <Button>
                    Update {}
                </Button>
                <Button>
                    Fork Save
                </Button>
            </Modal.Footer>
        </Modal>
    )
}