const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    productName: { type: String, required: true },
    productHandleGroup: { type: String, required: true },

    productImages: [String],

    productDetails: {
      descriptionHtml: String,
      tags: [String],
      vendor: String,
      productType: String,
      shippingInfo: String,
    },

    ratings: {
      average: { type: Number, default: 0 },
      reviewCount: { type: Number, default: 0 },
    },

    variants: [
      {
        color: { type: String, required: true },
        handle: { type: String, required: true },
        productUrl: { type: String, required: true },

        materials: [
          {
            material: { type: String, required: true },
            sizes: [
              {
                size: { type: String, required: true },
                price: { type: Number, required: true },
                oldPrice: Number,
                variantId: { type: Number, required: true },
                variantUrl: { type: String, required: true },
              },
            ],
          },
        ],
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
