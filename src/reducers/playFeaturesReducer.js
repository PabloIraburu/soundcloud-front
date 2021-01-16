
export const songsReducer = (state = [], action) => {
    switch (action.type) {
        case 'play':
            return [...state, action.payload];

        case 'next':
            return [...state, action.payload];

        case 'preview':
            return [...state, action.payload];

        case 'random':
            return [...state, action.payload];

        case 'repeat':
            return [...state, action.payload];

        default:
            return state;
    }
}
