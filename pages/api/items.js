import { MongoClient } from "mongodb";

const url = "mongodb://localhost:27017";

const client = new MongoClient(url);

export default async function handler(req, res) {
  try {
    await client.connect();

    await client.db("admin").command({ ping: 1 });
    console.log("hi");
  } catch (error) {
    console.log(error);
  } finally {
    await client.close();
  }
}
