//Mark a car as "Available" after its rental period ends.
import { MongoClient, ObjectId } from "mongodb";

const uri = "mongodb://localhost:27017" || process.env.MONGO_URI;
const client = new MongoClient(uri);

async function updateCarStatus() {
  try {
    await client.connect();
    const database = client.db('carRentalManagement');
    const cars = database.collection('Cars');

    const result = await cars.updateOne(
      { _id: new ObjectId("4c12ecdede23669f30b0fb9b") }, 
      { $set: { rental_status: "Available" } }
    );

    console.log(`Matched: ${result.matchedCount}, Modified: ${result.modifiedCount}`);
  } finally {
    await client.close();
  }
}

updateCarStatus();
