export class Account {
  id: string;
  name: string;
  issuer: string;

  private key: string;

  constructor(id: string, name: string, issuer: string, key: string) {
    this.id = id;
    this.name = name;
    this.issuer = issuer;
    this.key = key;
  }
}
