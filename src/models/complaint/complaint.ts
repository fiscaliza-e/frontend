class Complaint {
    id: number;
    userId: number;
    cityHallUserId: number;
    departmentId: number;
    adressesId: number;
    title: string;
    description: string;
    status: string;
    complaintDate: Date;
  
    constructor(
      id: number,
      userId: number,
      cityHallUserId: number,
      departmentId: number,
      adressesId: number,
      title: string,
      description: string,
      status: string,
      complaintDate: Date
    ) {
      this.id = id;
      this.userId = userId;
      this.cityHallUserId = cityHallUserId;
      this.departmentId = departmentId;
      this.adressesId = adressesId;
      this.title = title;
      this.description = description;
      this.status = status;
      this.complaintDate = complaintDate;
    }
  
    toJSON() {
      return {
        id: this.id,
        user_id: this.userId,
        city_hall_user_id: this.cityHallUserId,
        department_id: this.departmentId,
        adresses_id: this.adressesId,
        title: this.title,
        description: this.description,
        status: this.status,
        complaint_date: this.complaintDate.toISOString()
      };
    }
  
    static fromJSON(json: any): Complaint {
      return new Complaint(
        json.id,
        json.user_id,
        json.city_hall_user_id,
        json.department_id,
        json.adresses_id,
        json.title,
        json.description,
        json.status,
        new Date(json.complaint_date)
      );
    }
  }
  
export default Complaint;