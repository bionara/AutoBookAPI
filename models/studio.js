import mongoose from 'mongoose';

var studioSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  location: {
    type: String
  }
});

export default mongoose.model('Studio', studioSchema);
