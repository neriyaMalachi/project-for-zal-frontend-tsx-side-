import create from 'zustand';

type Employee={
    username?: string | undefined;
    isLogged?:boolean;
    authFailed?:boolean;
    isAdmin?:boolean;
    isError?:boolean;
    setUsername: (username) => void,
    setIsLogged: (isLogged) => void,
    setIsAdmin: (isAdmin) => void,
    setIsError: (isError) => void,
    setAuthFailed: (authFailed) => void
}

const useStore = create<Employee>(set => ({
    username: undefined,
    isLogged: false,
    authFailed: false,
    isAdmin: false,
    isError: false,
    setUsername: (username) => { set({ username }) },
    setIsLogged: (isLogged) => { set({ isLogged }) },
    setIsAdmin: (isAdmin) => { set({ isAdmin }) },
    setIsError: (isError) => { set({ isError }) },
    setAuthFailed: (authFailed => { set({ authFailed }) }

    )
}))

export default useStore
