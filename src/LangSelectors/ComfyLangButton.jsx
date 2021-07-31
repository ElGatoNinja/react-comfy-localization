//This component is provisional and only intended for testing

import React from 'react';

import Button from 'react-bootstrap/Button';
import { useComfyNode } from '../ComfyNode';

export default function ComfyLangButton(props) {
    const comfy = useComfyNode();

    return(
        <Button onClick={() => comfy.setActiveLanguage("en")}>English</Button>
    )
}