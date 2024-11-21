export class serviceDto {
    name: string;
    location: string;
    phonenumber: string;
    address: string;
    services_offered: {
      service_name: string,
      service_price: number // Keep as number in the DTO
    }[];
    description: string;
    images: string[];
    category_id: number;
    user_id: number;
    profile_image: string
}