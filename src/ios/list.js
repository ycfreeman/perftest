// local
import perfTest from '../perfTest'
import raf from 'raf'

import * as actions from '../redux/actions'

var JSItem = window.JSItem || {};

(function(){

    if ("performance" in window == false) {
        window.performance = {};
    }

    Date.now = (Date.now || function () {  // thanks IE8
        return new Date().getTime();
    });

    if ("now" in window.performance == false){

        var nowOffset = Date.now();

        if (performance.timing && performance.timing.navigationStart){
            nowOffset = performance.timing.navigationStart
        }

        window.performance.now = function now(){
            return Date.now() - nowOffset;
        }
    }

})();
/**
 * we only need to implement this class for platform specific lifecycle (?)
 */
export default class List {

    constructor(options) {
        this.store = options.store;
        this.storeKey = 'myReducer';
        this.store.subscribe(this.render.bind(this));
        this.items = [];
    }

    start() {
        this.update();
        // console.log("tick");
        setTimeout(() => {
            perfTest.start(actions, this.store.dispatch)
        }, perfTest.startDelay)
    }

    update() {
        const { data } = this.getState();

        // convert js items to new instances of swift items
        data.forEach(item => {
            if (!this.items.hasOwnProperty(item.id)) {
                this.items[item.id] = JSItem.createWithIdStrInt(item.id, item.str, item.int);
            } else {
                let swiftItem = this.items[item.id];
                swiftItem.str = item.str;
                swiftItem.int = item.int;
                // console.log(swiftItem.hashValue);
                this.items[item.id] = swiftItem;
            }
        });
        // call native function here
        JSItem.emitItems(this.items);
    }

    render() {
        this.update();
        this.didUpdate();
    }

    didUpdate() {
        const { updatesRemaining } = this.getState()
        const noMoreTests = updatesRemaining === 0
        if (noMoreTests || !perfTest.isRunning()) {
            perfTest.end()
        } else {
            // pause while waiting for next frame, then resume
            perfTest.pause()
            raf(() => perfTest.resume())
        }
    }

    getState() {
        const storeState = this.store.getState();
        return storeState[this.storeKey]
    }
}
