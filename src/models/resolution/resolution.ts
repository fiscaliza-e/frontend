class Resolution {
  id: number;
  complaintId: number;
  title: string;
  description: string;
  resolutionDate: Date;

  constructor(
    id: number,
    complaintId: number,
    title: string,
    description: string,
    resolutionDate: Date
  ) {
    this.id = id;
    this.complaintId = complaintId;
    this.title = title;
    this.description = description;
    this.resolutionDate = resolutionDate;
  }

  toJSON() {
    return {
      id: this.id,
      complaint_id: this.complaintId,
      title: this.title,
      description: this.description,
      resolution_date: this.resolutionDate.toISOString(),
    };
  }

  static fromJSON(json: any): Resolution {
    return new Resolution(
      json.id,
      json.complaint_id,
      json.title,
      json.description,
      new Date(json.resolution_date)
    );
  }
}

export default Resolution;
