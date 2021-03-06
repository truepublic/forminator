import { FormDescriptor, Forminator, SubmitFn, ErrorFn } from '../forminator';
import { useMemo, useRef, useEffect, useState, useCallback } from 'react';

export const useForm = <T extends object, A extends object = any, E extends object = {}>(
    descriptor: FormDescriptor<T, A, E>,
    onSubmit?: SubmitFn<T, A>,
    onError?: ErrorFn
): Forminator<T, A, E> => {
    const onSubmitRef = useRef<SubmitFn<T, A>>(onSubmit);
    // const [, updateState] = useState();
    // const forceUpdate = useCallback(() => updateState({}), []);

    useEffect(() => {
        onSubmitRef.current = onSubmit;
    }, [onSubmit]);

    const form = useMemo(() => {
        return new Forminator({ ...descriptor, onSubmit: (v, args: A) => {
            onSubmitRef.current && onSubmitRef.current(v, args)
        }, onError });
    }, [descriptor]);

    // useEffect(() => {
    //     form.onFormError(forceUpdate);
    // }, [])

    return form;
};