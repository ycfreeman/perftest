// libs
import React from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import raf from 'raf'

// local
import crazyLog from '../crazyLog'
import perfTest from '../perfTest'
import * as actions from '../redux/actions'

// react
import ItemFn from './itemFn'
import ItemClass from './itemClass'

// component
class list extends React.Component {

  render() {
    const { data } = this.props.data
    
    // const Item = ItemClass
    const Item = ItemFn
    
    const listItems = data.map(item => <Item key={item.id} item={item} />)
    return <ul>{listItems}</ul>
  }

  componentDidMount() {
    perfTest.start(this.testFn())
  }

  componentDidUpdate() {
    const noMoreTests = this.props.data.updatesRemaining === 0
    if (noMoreTests || !perfTest.isRunning()) {
      perfTest.end(crazyLog)
    } else {
      // pause while waiting for next frame, then resume
      perfTest.pause()
      raf(() => perfTest.resume())
    }
  }

  // shouldComponentUpdate(newProps, newState) {
  //   return this.state.data !== newState.data;
  // }

  testFn() {
    const { updateEverything, updateNothing, incAllInt, incNthInt } = this.props.actions
    return {
      updateFn: updateEverything,
      fnParams: 10
    }
  }
}

// map component to store
const mapStateToProps = (state) => ({
  data: state.myReducer
})
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch)
})
export default connect(mapStateToProps, mapDispatchToProps)(list)
