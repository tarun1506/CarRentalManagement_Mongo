//List all customers who have at least one booking with a total cost exceeding $900.
import { MongoClient, ObjectId } from "mongodb";

const uri = "mongodb://localhost:27017" || process.env.MONGO_URI;
const client = new MongoClient(uri);
async function findHighValueCustomers() {
  try {
    await client.connect();
    const database = client.db('carRentalManagement');
    const customers = database.collection('Customer');

    const result = await customers.find(
      { "bookings.total_cost": { $gt: 900 } },
      { projection: { name: 1, contact: 1, "bookings.total_cost": 1 } }
    ).toArray();

    console.log(result);
  } finally {
    await client.close();
  }
}

findHighValueCustomers();
