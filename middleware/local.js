import Cookies from "js-cookie";

export default function ({ store, redirect, app }) {
  const isLocal = store.getters['chart/local']
  var s4 = () => {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  }
  const generateID = () => {
    return 'idLocal' + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4();
  }
  console.log(isLocal)
  if (!isLocal) return Cookies.set("local", generateID())
}