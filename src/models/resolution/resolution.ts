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
      complaintId: this.complaintId,
      title: this.title,
      description: this.description,
      resolution: this.resolutionDate.toISOString(),
    };
  }

  static fromJSON(json: any): Resolution {
    return new Resolution(
      json.id,
      json.complaintId,
      json.title,
      json.description,
      new Date(json.resolution)
    );
  }
}

export default Resolution;
