class ResolutionAttachment {
  resolutionId: number;
  imageUrl: string;

  constructor(resolutionId: number, imageUrl: string) {
    this.resolutionId = resolutionId;
    this.imageUrl = imageUrl;
  }

  toJSON() {
    return {
      resolution_id: this.resolutionId,
      image_url: this.imageUrl,
    };
  }

  static fromJSON(json: any): ResolutionAttachment {
    return new ResolutionAttachment(json.resolution_id, json.image_url);
  }
}

export default ResolutionAttachment;
