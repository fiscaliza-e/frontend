class CityHallUser {
  id: number;
  cnpj: string;
  cityName: string;
  email: string;
  addressId: number;

  constructor(
    id: number,
    cnpj: string,
    cityName: string,
    email: string,
    addressId: number
  ) {
    this.id = id;
    this.cnpj = cnpj;
    this.cityName = cityName;
    this.email = email;
    this.addressId = addressId;
  }

  toJSON() {
    return {
      id: this.id,
      cnpj: this.cnpj,
      city_name: this.cityName,
      email: this.email,
      address_id: this.addressId,
    };
  }

  static fromJSON(json: any) {
    return new CityHallUser(
      json.id,
      json.cnpj,
      json.cityName,
      json.email,
      json.addressId
    );
  }
}

export default CityHallUser;
