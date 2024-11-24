//Count the number of bookings made by a specific customer.
import { MongoClient, ObjectId } from "mongodb";

const uri = "mongodb://localhost:27017" || process.env.MONGO_URI;
const client = new MongoClient(uri);

async function countBookingsForCustomer() {
  try {
    await client.connect();
    const database = client.db('carRentalManagement');
    const bookings = database.collection('Booking');

    const count = await bookings.countDocuments({
      customer_id: new ObjectId("fa5bc607f29093783c3ee994") 
    });

    console.log(`Total bookings: ${count}`);
  } finally {
    await client.close();
  }
}

countBookingsForCustomer();
