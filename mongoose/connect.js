import mongoose from 'mongoose';

const connection = {};

async function connect() {
  if (connection.isConnected) {
    var x='Database already connected';
    return;
  }

  try {
    const db = await mongoose.connect(process.env.DBNAME, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    connection.isConnected = db.connections[0].readyState;
    console.log('Database connected');
  } catch (error) {
    console.error('Error connecting to database:', error);
  }
}

export default connect;
