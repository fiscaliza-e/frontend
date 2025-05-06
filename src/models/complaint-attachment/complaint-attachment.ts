class ComplaintAttachment {
    complaintId: number;
    imageUrl: string;
  
    constructor(complaintId: number, imageUrl: string) {
      this.complaintId = complaintId;
      this.imageUrl = imageUrl;
    }
  
    toJSON() {
      return {
        complaintId: this.complaintId,
        imageUrl: this.imageUrl,
      };
    }
  
  
    static fromJSON(json: any): ComplaintAttachment{
      return new ComplaintAttachment(
          json.complaintId,
          json.imageUrl
      )
    }
  }
  
  
  export default ComplaintAttachment