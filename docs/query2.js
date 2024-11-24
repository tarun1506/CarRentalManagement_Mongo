// Find bookings where the car category is either "SUV" or "Compact" and the rental cost exceeds $700.
import { MongoClient } from "mongodb";

const uri = "mongodb://localhost:27017" || process.env.MONGO_URI;
const client = new MongoClient(uri);

async function findComplexBookings() {
  try {
    await client.connect();
    const database = client.db('carRentalManagement');
    const bookings = database.collection('Booking');

    const result = await bookings.find({
      $and: [
        { "cars.category": { $in: ["SUV", "Compact"] } },
        { total_cost: { $gt: 700 } }
      ]
    }).toArray();

    console.log(result);
  } finally {
    await client.close();
  }
}

findComplexBookings();