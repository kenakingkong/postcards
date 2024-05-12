export default interface IPostcard {
  id: number;
  user_id: string;
  created_at: Date;
  front_image_url: string;
  back_image_url: string;
  pdf_url: string;
  template_id: string;
  front_image_orientation: string;
  back_image_orientation: string;
  show_in_gallery: boolean;
}
