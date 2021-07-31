import React from 'react';
import EditStringsModal from './EditStringModal';
import Button from 'react-bootstrap/Button';
import { useComfyNode } from './ComfyNode';

export default function ComfyLoc(props) {
    const [isEditOpen, setIsEditOpen] = React.useState(false);
    const [locString, setLocString] = React.useState();
    const comfyT = useComfyNode(); 

    React.useEffect(() => {
        if (typeof props.children === "string"){ //using the children as entry key
            setLocString(comfyT.translate(props.children));
        }
    },[comfyT.activeLanguage,comfyT,props.children])

    if(process.env.NODE_ENV === "development") {
        return(
            <div>
                {locString}
                <Button onClick={() => setIsEditOpen(true)}>E</Button>
                <EditStringsModal 
                    entryId={props.children}
                    isOpen={isEditOpen}
                    setIsOpen={setIsEditOpen}
                />
            </div>)
    }
    else {
        return(locString)
    }
}