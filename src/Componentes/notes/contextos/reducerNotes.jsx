
export const typesNotes = {
    load: "state/load",
}


export default (state, action) => {
    switch (action.type){

        case typesNotes.load: {
            return {
                ...state,
                load: action.load
            }
        }

        default:
            return state;

    }
}
