import store from '@/store'
export function hasBtnPermission(value) {
  debugger
  const myBtns = store.getters.buttons
  const b = myBtns.indexOf(value) > -1
  return b
}
