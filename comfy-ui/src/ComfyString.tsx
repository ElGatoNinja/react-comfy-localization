import React from 'react';
import EditStringsModal from './EditStringModal';
import Button from 'react-bootstrap/Button';
import { useComfyNode } from './ComfyNode';


interface ComponentProps {
    entryId: string,
    children?: React.ReactChild,
}

export default function ComfyString(props: ComponentProps) {
    const [isEditOpen, setIsEditOpen] = React.useState(false);
    const [locString, setLocString] = React.useState('');
    const comfyT = useComfyNode(); 

    React.useEffect(() => {
        setLocString(comfyT.translate(props.entryId));
    },[comfyT.activeLang,comfyT,props.children])

    if(process.env.NODE_ENV === "development") {
        return(
            <div className="comfy-editable-text">
                {locString}
                <Button onClick={() => setIsEditOpen(true)}>E</Button>
                <EditStringsModal 
                    entryId={props.entryId}
                    isOpen={isEditOpen}
                    setIsOpen={setIsEditOpen}
                />
            </div>)
    }
    else {
        return(<React.Fragment>{locString}</React.Fragment>)
    }
}