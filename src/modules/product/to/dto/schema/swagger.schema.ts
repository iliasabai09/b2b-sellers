export const UPLOAD_PRODUCT_IMAGE_SCHEMA = {
  schema: {
    type: 'object',
    properties: {
      image: {
        type: 'string',
        format: 'binary',
        nullable: true,
      },
      oldUrl: {
        type: 'string',
        example: '/uploads/products/old-image.png',
        nullable: true,
      },
    },
    // required: ['image'],
    required: [],
  },
};
