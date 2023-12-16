export const getCategoryId = (cartegoryName: string) => {
   let category_id: number;
   switch (cartegoryName) {
      case "youtube":
         category_id = 1;
         break;
      case "facebook":
         category_id = 2;
         break;
      case "instagram":
         category_id = 3;
         break;
      case "telegram":
         category_id = 4;
         break;
      default:
         category_id = 1;
         break;
   }

   return category_id;
};
