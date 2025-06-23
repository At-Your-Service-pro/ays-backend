export class serviceDto {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    brandname: string;
    location: string;
    phonenumber: string;
    address: string;
    services: {
      name: string,
      price: string // Keep as number in the DTO
    }[];
    description: string;
    images: string[];
    category: number; 
}