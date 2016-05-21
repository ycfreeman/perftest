// local
// import perfTest from '../perfTest'
import * as actions from '../redux/actions'

var Item = window.Item || {};

/**
 * we only need to implement this class for platform specific lifecycle (?)
 */
export default class List {

    constructor(options) {
        this.store = options.store;
        this.storeKey = 'myReducer';
        this.store.subscribe(this.render.bind(this));
    }

    start() {
        this.update();
        // console.log("tick");
        this.store.dispatch(actions.incNthInt(10))
    }

    update() {
        const { data } = this.getState();
        var items = data.map(item => {
            return Item.createWithIdStrInt(item.id,item.str,item.int);
        });
        // call native function here
        Item.emitItems(items);
    }

    render() {
        this.update();
        this.didUpdate();
    }

    didUpdate() {
        const { updatesRemaining } = this.getState();
        const noMoreTests = updatesRemaining === 0;
        if (!noMoreTests) {
            // console.log("tickDidupdate", updatesRemaining);
            this.store.dispatch(actions.incNthInt(10))
        }
    }

    getState() {
        const storeState = this.store.getState();
        return storeState[this.storeKey]
    }
}
