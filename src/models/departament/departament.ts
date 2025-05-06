class Departament {
  id: number;
  cityHallUserId: number;
  name: string;
  description: string;
  email: string;

  constructor(
    id: number,
    cityHallUserId: number,
    name: string,
    description: string,
    email: string
  ) {
    this.id = id;
    this.cityHallUserId = cityHallUserId;
    this.name = name;
    this.description = description;
    this.email = email;
  }

  toJSON() {
    return {
      id: this.id,
      cityHallUserId: this.cityHallUserId,
      name: this.name,
      description: this.description,
      email: this.email,
    };
  }

  static fromJSON(json: any): Departament {
    return new Departament(
      json.id,
      json.cityHallUserId,
      json.name,
      json.description,
      json.email
    );
  }
}

export default Departament;