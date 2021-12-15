import AppError from "./utils/app-error.js";
import AsyncHandler from "express-async-handler";
import https from "https";
import { config } from "dotenv";
config({ path: ".env" });

const updateItem = (productId, updateFields) => {
  return new Promise((res, rej) => {
    const postData = JSON.stringify({
      fields: updateFields,
    });
    const request = https.request(
      `https://api.webflow.com/collections/${process.env.COLLECTION_ID}/items/${productId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Content-Length": postData.length,
          "Accept-Version": "1.0.0",
          Authorization: `Bearer ${process.env.WEBFLOW_TOKEN}`,
        },
      },
      (resp) => {
        if (resp.statusCode === 200) {
          resp.on("end", () => res(null));
          resp.on("error", (err) => rej(err));
        } else {
          rej(JSON.parse(chunk.toString())["msg"]);
        }
      }
    );

    request.write(postData);
    request.end();
  });
};

export const addToCart = AsyncHandler(async (req, res) => {
  const data = Object.assign({}, req.body);
  const { productId, updateFields } = data;

  try {
    await updateItem(productId, updateFields);
    res.json({
      status: true,
      msg: "Product Updated",
    });
  } catch (error) {
    console.error(error);
    return next(new AppError(error.message, 400));
  }
});
