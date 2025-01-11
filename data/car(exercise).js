class Car {
  #brand;
  #model;
  speed;
  trunk;

  constructor(details){
    this.#brand = details.brand;
    this.#model = details.model;
    this.speed = details.speed;
    this.trunk = details.trunk;
  }

  displayInfo(){
    console.log(`
      brand: ${this.#brand} 
      model: ${this.#model} 
      speed: ${this.speed}km/h 
      trunk: ${this.trunk}`)
  };

  go(){
    this.trunk ? this.speed += 0 : this.speed += 5; 
    this.displayInfo();
  }

  brake(){
    this.speed -= 5;
    this.displayInfo()
  }

  opendTrunk(){
    this.speed ? this.trunk = false : this.trunk = true;
    this.displayInfo();
  }

  closeTrunk(){
    this.trunk = false;
    this.displayInfo();
  }
}

class RaceCar extends Car{
  acceleration;
  #brand;
  #model;

  constructor(details){
    super(details);
    delete this.opendTrunk;
    delete this.closeTrunk;
    delete this.trunk;

    this.#brand = details.brand;
    this.#model = details.model;
    
    this.speed = 1;
    this.acceleration = 5
  }

  go(){
    this.speed *= this.acceleration;
    this.displayInfo();
  }

  displayInfo(){
    console.log(`
      brand: ${this.#brand} 
      model: ${this.#model} 
      speed: ${this.speed}km/h 
      acceleration: ${this.acceleration}`)
  };
}

export const car = new Car({brand: "toyota", model: "Corolla", speed: 0, trunk: false});

const raceCar = new RaceCar({brand: "toyota", model: "Corolla", speed: 0, acceleration: 8});