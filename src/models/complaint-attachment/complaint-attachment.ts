class ComplaintAttachment {
  complaintId: number;
  imageUrl: string;

  constructor(complaintId: number, imageUrl: string) {
    this.complaintId = complaintId;
    this.imageUrl = imageUrl;
  }

  toJSON() {
    return {
      complaint_id: this.complaintId,
      image_url: this.imageUrl,
    };
  }

  static fromJSON(json: any): ComplaintAttachment {
    return new ComplaintAttachment(json.complaint_id, json.image_url);
  }
}

export default ComplaintAttachment;
