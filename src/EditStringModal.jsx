import React from 'react';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Form from 'react-bootstrap/Form';
import { useComfyNode } from './ComfyNode';
import { useEffect } from 'react';

export default function EditStringModal(props) {
    const [allStrings, setAllStrings] = React.useState({});

    const comfy = useComfyNode();

    useEffect(() => {
        return async () => {setAllStrings(await comfy.fetchAllLocalizations(props.entryId))};
    },[comfy,props.entryId])

    return(
        <Modal show={props.isOpen}>
            <Modal.Header>
                <Modal.Title>{props.entryId} used in {} places</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Tabs>
                    {Object.keys(allStrings).map((lang,i) => {
                        return (
                            <Tab key={i} id={i} eventKey={lang} title={lang}>
                                <Form>
                                    <Form.Control 
                                    as="textarea"
                                    value={allStrings[lang]}
                                    onChange={(e)=> {
                                        setAllStrings({...allStrings,[lang]:e.target.value})
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