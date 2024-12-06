export class PhoneNumber {
  constructor(
    public id: string = "",
    public number: string,
    public type: string,
    public createdAt: Date = new Date(),
    public updatedAt: Date = new Date()
  ) {}
}
