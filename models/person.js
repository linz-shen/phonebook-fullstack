import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const url = process.env.MONGODB_URI;
console.log("Connecting to", url);

mongoose.set("strictQuery", true);
mongoose
  .connect(url)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1);
  });

// Person schema definition
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: [3, "Name must be at least 3 characters long"],
    required: [true, "Name is required"],
    unique: true,
  },
  number: {
    type: String,
    minLength: [8, "Phone number must be at least 8 characters long"],
    required: [true, "Phone number is required"],
    validate: {
      validator: (v) => /^\d{2,3}-\d+$/.test(v),
      message: (props) =>
        `${props.value} is not a valid phone number! Format should be 2–3 digits, hyphen, and the rest digits (e.g. 09-1234567 or 040-1234567)`,
    },
  },
});

// Customize JSON output (remove internal fields)
personSchema.set("toJSON", {
  transform: (doc, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
  },
});

// Static helper for upsert logic (update if name exists, insert otherwise)
personSchema.statics.upsertPerson = async function (name, number) {
  return this.findOneAndUpdate(
    { name },
    { number },
    { new: true, upsert: true, runValidators: true, context: "query" },
  );
};

export default mongoose.model("Person", personSchema);
