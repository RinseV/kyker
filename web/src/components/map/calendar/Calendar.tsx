import {
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    VStack
} from '@chakra-ui/react';
import { format, parse } from 'date-fns';
import React, { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { setHours, setDate } from '../../../store/reducers/query.slice';
import { ISO_DATE_FORMAT } from '../../../utils/constants';
import { minutesToTime, TimeRangeSlider, timeToMinutes } from '../../form/TimeRangeSlider';
import { CalendarInput } from './CalendarInput';

type FormData = {
    date: Date;
    hours: number[];
};

type CalendarProps = {
    isOpen: boolean;
    onClose: () => void;
};

export const Calendar: React.FC<CalendarProps> = ({ isOpen, onClose }) => {
    const initialRef = useRef(null);
    const finalRef = useRef(null);

    const queryDate = useAppSelector((state) => state.query.date);
    const startHour = useAppSelector((state) => state.query.startHour);
    const endHour = useAppSelector((state) => state.query.endHour);
    const dispatch = useAppDispatch();

    const {
        control,
        handleSubmit,
        formState: { isSubmitting }
    } = useForm<FormData>({
        defaultValues: {
            date: parse(queryDate, ISO_DATE_FORMAT, new Date()),
            hours: [timeToMinutes(startHour), timeToMinutes(endHour)]
        }
    });

    const onSubmit = (data: FormData) => {
        // Convert to HH:mm strings
        const startHour = minutesToTime(data.hours[0]);
        const endHour = minutesToTime(data.hours[1]);
        // Set new date and hours
        dispatch(setDate(format(data.date, ISO_DATE_FORMAT)));
        dispatch(setHours({ startHour, endHour }));
        // Close modal
        onClose();
    };

    return (
        <Modal initialFocusRef={initialRef} finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose} size="sm">
            <ModalOverlay />
            <ModalContent p={0} my={4}>
                <ModalHeader>Date & time options</ModalHeader>
                <ModalCloseButton />
                <ModalBody p={0} justifyContent="center">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <VStack spacing={4}>
                            <CalendarInput<FormData> name="date" control={control} label="Date" />
                            <TimeRangeSlider<FormData> name="hours" control={control} label="Time window" />
                        </VStack>
                    </form>
                </ModalBody>
                <ModalFooter>
                    <Button
                        colorScheme="green"
                        mr={3}
                        type="submit"
                        onClick={() => handleSubmit(onSubmit)()}
                        isLoading={isSubmitting}
                    >
                        Save
                    </Button>
                    <Button onClick={onClose} isDisabled={isSubmitting} ref={initialRef}>
                        Cancel
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};
