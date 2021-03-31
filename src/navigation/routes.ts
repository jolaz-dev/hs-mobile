class Route {
  _name: string;
  _displayName?: string;

  constructor(name: string, displayName?: string) {
    this._name = name;
    this._displayName = displayName;
  }

  get displayName() {
    return this._displayName || this._name;
  }

  get name() {
    return this._name;
  }
}

export const AppRoutes = {
  home: new Route('Home', 'JoLAZ - Home Security'),
};
