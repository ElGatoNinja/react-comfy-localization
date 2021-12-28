import React from 'react';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Form from 'react-bootstrap/Form';
import { useComfyNode } from './ComfyNode';
import { useEffect } from 'react';


interface ComponentProps {
    entryId: string,
    isOpen: boolean,
    setIsOpen: (state: boolean) => void;
}

export default function EditStringModal(props: ComponentProps) {
    const [allStrings, setAllStrings] = React.useState({});

    const comfy = useComfyNode();

    // /comfy-endpoint is the endpoint that allow to edit strings under the comfyloc tag in the browser
    async function SaveEdition( _: React.MouseEvent) {
        await fetch('/comfy-endpoint',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(allStrings),
        })
    }

    useEffect(() => {
        const fillModal = async () => {
            setAllStrings(await comfy.getAllLocalsById!(props.entryId))
        };
        fillModal();
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
                            <Tab key={i} id={i.toString()} eventKey={lang} title={lang}>
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
                <Button onClick={SaveEdition}>
                    Fork Save
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

