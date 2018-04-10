export default {
  showModal(state) {
    state.showModalState = true
  },
  updateDate(state, newSet) {
    state.date = newSet
    state.year = newSet.split('-')[0]
    state.month = newSet.split('-')[1]
  },
  updateOperateArea(state, newSet) {
    state.operateArea = newSet
  },
  updatePerformanceCity(state, newSet) {
    state.performanceCity = newSet.trim()
  },
  updateBehaviorProvince(state, newSet) {
    state.behaviorProvince = newSet
  },
  toggleNavBar(state, newSet) {
    state.navBarShowStatus = newSet
  },
  updateVtype(state, newSet) {
    state.vtype = newSet
  },
  exitApp(state, newSet) {
    state.isExitApp = newSet
  },
}
