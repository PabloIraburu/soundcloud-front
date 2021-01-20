
const initialState = {
    sontToReproduce: [],
    currentPlay: undefined
}

export const example = () => {
    LOAD_SONG,
        ADD_SONG
    PREV_SONG,
        REPRODUCE_IT_SONG
}

const [state, dispatch] = useReducer(reducer, initialState, init);

const newState = { ...state }
switch (action.type) {
    case value:

        break;

    default:
        break;
}

export userPlayerReducer = () => useReducer(reducer, initialState)