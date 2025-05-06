class User {
  id: number;
  cpf: string;
  name: string;
  email: string;
  birthDate: Date;
  adressesId: number;
  password: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(
    id: number,
    cpf: string,
    name: string,
    email: string,
    birthDate: Date,
    adressesId: number,
    password: string,
    createdAt: Date,
    updatedAt: Date
  ) {
    this.id = id;
    this.cpf = cpf;
    this.name = name;
    this.email = email;
    this.birthDate = birthDate;
    this.adressesId = adressesId;
    this.password = password;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  toJSON() {
    return {
      id: this.id,
      cpf: this.cpf,
      name: this.name,
      email: this.email,
      birth_date: this.birthDate.toISOString(),
      adresses_id: this.adressesId,
      password: this.password,
      created_at: this.createdAt.toISOString(),
      updated_at: this.updatedAt.toISOString(),
    };
  }

  static fromJSON(json: any): User {
    return new User(
      json.id,
      json.cpf,
      json.name,
      json.email,
      new Date(json.birth_date),
      json.adresses_id,
      json.password,
      new Date(json.created_at),
      new Date(json.updated_at)
    );
  }
}

export default User;
