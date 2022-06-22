import { IconButton } from '@chakra-ui/button';
import { useToast } from '@chakra-ui/toast';
import React, { useRef } from 'react';
import { MdAdd, MdBlock } from 'react-icons/md';
import { TargetMarkerInfo } from '../Map';

type AddButtonProps = {
    editMode: boolean;
    setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
    setTargetMarker: React.Dispatch<React.SetStateAction<TargetMarkerInfo | null>>;
};

export const AddButton: React.FC<AddButtonProps> = ({ editMode, setEditMode, setTargetMarker }) => {
    const toast = useToast();
    const editToastRef = useRef<null | number | string | undefined>(null);

    const handleAddButtonClick = () => {
        if (editMode) {
            // If we are in edit mode, remove the toast and set edit mode to false
            if (editToastRef.current) {
                toast.close(editToastRef.current);
            }
            // Remove marker
            setTargetMarker(null);
            // Set edit mode to false
            setEditMode(false);
        } else {
            // Otherwise, enter edit mode and show the toast
            setEditMode(true);
            editToastRef.current = toast({
                title: 'Click anywhere to add a spotting',
                status: 'info',
                duration: null,
                isClosable: false
            });
        }
    };

    return (
        <IconButton
            aria-label="Add spotting"
            icon={editMode ? <MdBlock /> : <MdAdd />}
            title="Add a spotting"
            onClick={handleAddButtonClick}
        />
    );
};
