import mongoose from "mongoose";

const connection = {};

async function connectDb() {
  // Nếu connection.isConnected tồn tại thì tức là đã connect trước đó rồi, không cần tạo connect mới nữa.
  if (connection.isConnected) {
    console.log("Already connected to the database");
    return;
  }

  if (mongoose.connections.length > 0) {
    // readyState bằng 1 nếu đã connected
    connection.isConnected = mongoose.connections[0].readyState;
    if (connection.isConnected === 1) {
      console.log("Use previous connection to the database.");
      return;
    }
    await mongoose.disconnect();
  }

  //   Thực hiện connect lần đầu tiên nếu trước đó chưa connect lần nào
  const db = await mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("New connection to the database.");
  connection.isConnected = db.connections[0].readyState;
}

// Tại Dev mode, mỗi lần connect tới db thì không nhất thiết đều phải disconnect.
// Chi khi ở Production evironment với nhiều user, mới cần disconnect để giảm thiểu connection với database.
async function disConnectDb() {
  if (connection.isConnected) {
    // Tại Production thực hiện disconnect
    if (process.env.NODE_ENV === "production") {
      await mongoose.disconnect();
      connection.isConnected = false;
    } else {
      // Tại Development, không cần phải làm gì
      console.log("No need to disconnect from the database.");
    }
  }
}

const db = { connectDb, disConnectDb };

export default db;
