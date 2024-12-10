// src/domain/entities/PhoneNumber.ts
export class PhoneNumber {
  constructor(
    public id: string,
    public number: string,
    public type: string,
    public peopleId: string,
    public createdAt: Date,
    public updatedAt: Date
  ) {}
}
