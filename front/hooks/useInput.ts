import { ChangeEvent, useState, useCallback } from 'react';

type UseInput = [string, (event: ChangeEvent<HTMLInputElement>) => void, () => void];

const useInput = (initialState: string = ''): UseInput => {
    const [input, setInput] = useState<string>(initialState);

    const changeInput = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setInput(event.target.value);
    }, []);

    const setDefault = useCallback(() => {
        setInput('');
    }, []);

    return [input, changeInput, setDefault];
};

export default useInput;
