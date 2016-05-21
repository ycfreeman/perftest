import createStore from "../store";
import List from "./list";

const store = createStore();

for (var key in global) {
    console.log(key);
}

window.list = new List({ store });