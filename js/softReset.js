class Reset {
  #onCall = function (resource) {};
  constructor(onCall) {
    this.#onCall = onCall;
  }
  call(resource) { 
    #onCall();
  }
}
