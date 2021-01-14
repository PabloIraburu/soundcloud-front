export const songReducer = (state = [], action) => {
    switch (action.type) {
        case 'add':
            return [...state, action.payload];

        case 'delete':
            return state.filter(song => song.id !== action.payload);

        case 'edit':
            return state.filter(song => song.id !== action.payload);

        case 'toggle':
            return state.map(song =>
                (song.id === action.payload)
                    ? { ...song, done: !song.done }
                    : song
            );

        default:
            return state;
    }
}
