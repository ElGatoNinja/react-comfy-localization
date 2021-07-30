import React from 'react';
import EditStringsModal from './EditStringsModal';

import es from './comfy_jsons/es';
import en from './comfy_jsons/en';

export const AuthStateContext  = React.createContext();

export default function ConfyInt(props) {
    const [isEditOpen, setIsEditOpen] = React.useState(false);
    const [strings, setStrings] = React.useState(mockStrings);

    if(process.env.NODE_ENV === "development") {
        return(
            <div>
                {props.children}
                <Button onClick={() => setIsEditOpen(true)}>E</Button>
                <EditStringsModal 
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