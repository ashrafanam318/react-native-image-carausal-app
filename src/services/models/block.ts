export type Input = {
  title: string;
  images: (string | undefined)[];
};

export class Block {
  title: string;
  imageUrl: string | undefined;

  constructor({title, images}: Input) {
    this.title = title;
    this.imageUrl = this.rand(images);
  }

  private rand(images: string[]): string | undefined {
    return images[Number((Math.random() * 10).toFixed(0)) % images.length];
  }
}
