// @ts-ignore
import { MongoClient, ObjectID } from "mongodb";
import type { NextApiRequest, NextApiResponse } from "next";

const url = "mongodb://localhost:27017";

const client = new MongoClient(url);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await client.connect();
    const collection = client.db("my-website").collection("items");

    if (req.method === "GET") {
      const items = await collection.find({}).toArray();

      await client.close();
      res.json(items);
    } else if (req.method === "POST") {
      await collection.insertOne({
        item: req.body,
      });

      client.close();
      res.json({ msg: "done" });
    } else if (req.method === "DELETE") {
      await collection.deleteOne({ _id: ObjectID(req.body) });

      client.close();
      res.json({ msg: "done" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Unable to connect to database" });
  }
}
