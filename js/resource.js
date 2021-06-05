// Resource class
class Resource {
  constructor(amounts, basePrices) {
    this.amounts = amounts;
    this.basePrices = basePrices;
    this.produced = [0, 0, 0, 0, 0, 0];
  }

  buyBuilding(lvl) {
    if (!((this.basePrices[lvl - 1] * Math.pow(1.5, (this.amounts[lvl] - this.produced[lvl]))) > this.amounts[0])) {
      this.amounts[0] -= this.basePrices[lvl - 1] * Math.pow(1.5, this.amounts[lvl] - this.produced[lvl]);
      this.amounts[lvl]++;
    } else {
      Core.notify("You cannot afford this!");
    }
  }

  cost(lvl) {
    return this.basePrices[lvl - 1] * Math.pow(1.5, (this.amounts[lvl] - this.produced[lvl]));
  }
}
