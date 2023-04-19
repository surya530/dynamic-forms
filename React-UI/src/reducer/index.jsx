import { combineReducers } from "redux";
import storeUsers from "./users";
import storeForms from "./formReducer";
import storeFields from "./fieldReducer";
import storeRecords from "./formRecords";

const mainReducer = combineReducers({
    storeUsers,
    storeForms,
    storeFields,
    storeRecords
});

export default mainReducer;