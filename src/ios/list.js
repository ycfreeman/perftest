// local
import perfTest from '../perfTest'
import raf from 'raf'

import * as actions from '../redux/actions'

var Item = window.Item || {};

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
        var items = data.map(item => {
            return  Item.createWithIdStrInt(item.id,item.str,item.int);
        });
        // call native function here
        Item.emitItems(items);
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
