import React from 'react';

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