export default class Storage {
  static put(name: string, value: any) {
    return window.localStorage.setItem(name, JSON.stringify(value))
  }

  static get(name: string, d: any = null) {
    const item = window.localStorage.getItem(name)
    if (!item) return d
    return JSON.parse(item)
  }

  static has(name: string) {
    return !!window.localStorage.getItem(name)
  }

  static delete(name: string) {
    return window.localStorage.removeItem(name)
  }
}
