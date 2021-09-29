import { UPDATE_FORM, GET_ERRORS } from "../actions/types";
export const formReducer = (state, action) => {
    switch (action.type) {
        case UPDATE_FORM: {
            return action.payload;
        }
        case GET_ERRORS:
            return {
                ...state,
                errors: action.payload,
            };
        default: {
            return state;
        }
    }
};
