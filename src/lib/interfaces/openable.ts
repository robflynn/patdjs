export enum OpenState {
  open,
  closed
}

export default interface IOpenable {
  openState: OpenState

  open(): boolean
  close(): boolean
  isOpen(): boolean
}

export const Openable: IOpenable = {
  openState: OpenState.closed,

  isOpen(): boolean {
    return this.openState == OpenState.open
  },

  open(): boolean {
    this.openState = OpenState.open

    return true
  },

  close(): boolean {
    this.openState = OpenState.closed

    return true
  },
}
