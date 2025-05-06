class ResolutionAttachment {
  resolutionId: number;
  imageUrl: string;

  constructor(resolutionId: number, imageUrl: string) {
    this.resolutionId = resolutionId;
    this.imageUrl = imageUrl;
  }

  toJSON() {
    return {
      resolutionId: this.resolutionId,
      imageUrl: this.imageUrl,
    };
  }


  static fromJSON(json: any): ResolutionAttachment{
    return new ResolutionAttachment(
        json.resolutionId,
        json.imageUrl
    )
  }
}


export default ResolutionAttachment