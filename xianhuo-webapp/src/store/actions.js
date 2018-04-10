export default {
  showModal({ commit }, newSet) {
    commit('showModal', newSet)
  },
  updateDate({ commit }, newSet) {
    commit('updateDate', newSet)
  },
  updateOperateArea({ commit }, newSet) {
    commit('updateOperateArea', newSet)
  },
  updateBehaviorProvince({ commit }, newSet) {
    commit('updateBehaviorProvince', newSet)
  },
  updatePerformanceCity({ commit }, newSet) {
    commit('updatePerformanceCity', newSet)
  },
  updateVtype({ commit }, newSet) {
    commit('updateVtype', newSet)
  },
  toggleNavBar({ commit }, newSet) {
    commit('toggleNavBar', newSet)
  },
  exitApp({ commit }, newSet) {
    commit('exitApp', newSet)
  },
}
