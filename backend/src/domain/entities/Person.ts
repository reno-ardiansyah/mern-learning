import { Hobby } from './Hobby';
import { PhoneNumber } from './PhoneNumber';

export class Person {
  constructor(
    public id: string = "",
    public name: string,
    public age: number,
    public hobbies: Hobby[] = [],
    public phoneNumber: PhoneNumber | null = null,
    public createdAt: Date = new Date(),
    public updatedAt: Date = new Date()
  ) {}
}
