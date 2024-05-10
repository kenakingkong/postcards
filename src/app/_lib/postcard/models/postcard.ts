export default interface IPostcard {
  id: number;
  user_id: string;
  template_id: string;
  front_image_url: string;
  back_image_url: string;
  pdf_url: string;
}
