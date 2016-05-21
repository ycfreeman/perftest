// local
import perfTest from '../perfTest'
import * as actions from '../redux/actions'

/**
 * we only need to implement this class for platform specific lifecycle (?)
 */
export default class List {

    constructor(options) {
        this.el = options.el;
        this.store = options.store;
        this.storeKey = 'myReducer';
        this.store.subscribe(this.render.bind(this));
    }

    start() {
        this.update();
        setTimeout(() => {
            perfTest.start(actions, this.store.dispatch)
        }, perfTest.startDelay)
    }

    update() {
        const { data } = this.getState();
    }

    render() {
        this.update();
        this.didUpdate();
    }

    didUpdate() {
        const { updatesRemaining } = this.getState();
        const noMoreTests = updatesRemaining === 0;
        if (noMoreTests || !perfTest.isRunning()) {
            perfTest.end()
        }
    }

    getState() {
        const storeState = this.store.getState();
        return storeState[this.storeKey]
    }
}
