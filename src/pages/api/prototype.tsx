import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../lib/mongodb";
import { ObjectId } from "mongodb";

type ResponseData = {
  success: boolean;
  message?: string;
  data?: any;
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const { method } = req;

  try {
    const client = await clientPromise;
    const db = client.db("oblique_strategies");
    const collection = db.collection("strategies");

    switch (method) {
      case "GET": {
        const data = await collection
          .aggregate([{ $match: { seen: false } }, { $sample: { size: 1 } }])
          .toArray();
        res.status(200).json({ data, success: true });
      }

      case "PUT": {
        const { id, fav } = req.body;
        if (!id) {
          return res
            .status(400)
            .json({ success: false, error: "ID is required for update" });
        }

        if (fav) {
          const result = await collection.updateOne(
            { _id: new ObjectId(id as string) },
            { $set: { "starred": true } }
          );

          return res.status(200).json({
            success: true,
            message: "dileman added to favorites",
            data: result
          });
        } else {
          const result = await collection.updateOne(
            { _id: new ObjectId(id as string) },
            { $set: { seen: true } }
          );

          return res.status(200).json({
            success: true,
            message: "dileman seen",
            data: result
          });
        }
      }

      default:
        res.setHeader("Allow", ["PUT", "POST", "DELETE", "GET"]);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message || "Internal Server Error"
    });
  }
}
