class Address {
  id: number;
  street: string;
  neighborhood: string;
  houseNumber: number;
  zipCode: number;
  city: string;
  state: string;
  latitude: number;
  longitude: number;

  constructor(
    id: number,
    street: string,
    neighborhood: string,
    houseNumber: number,
    zipCode: number,
    city: string,
    state: string,
    latitude: number,
    longitude: number
  ) {
    this.id = id;
    this.street = street;
    this.neighborhood = neighborhood;
    this.houseNumber = houseNumber;
    this.zipCode = zipCode;
    this.city = city;
    this.state = state;
    this.latitude = latitude;
    this.longitude = longitude;
  }

  toJSON() {
    return {
      id: this.id,
      street: this.street,
      neighborhood: this.neighborhood,
      house_number: this.houseNumber,
      zip_code: this.zipCode,
      city: this.city,
      state: this.state,
      latitude: this.latitude,
      longitude: this.longitude,
    };
  }

  static fromJSON(json: any): Address {
    return new Address(
      json.id,
      json.street,
      json.neighborhood,
      json.house_number,
      json.zip_code,
      json.city,
      json.state,
      json.latitude,
      json.longitude
    );
  }
}

export default Address;
