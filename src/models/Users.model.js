import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    agentCode: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    mobile: { type: String, required: true, match: /^[0-9]{10}$/ }, // Ensure a 10-digit mobile number
    channel: { type: String },
    designation: { type: String },
    rank: { type: String },
    branch: { type: String },
    appointmentDate: { type: Date },
    validUpto: { type: Date },
    caNumber: { type: String },
    tinNumber: { type: String },
    province: { type: String },
    city: { type: String },
    pinCode: { type: String },
    subagentCode: { type: String },
    status: { type: String },
    reportingManagerId: { type: String }
  },
  { timestamps: { createdAt: true, updatedAt: false } } // Track creation time only
);

// Index for faster lookups
UserSchema.index({ appointmentDate: 1 }); // Index on appointmentDate for quicker date lookups
UserSchema.index({ email: 1 }); // Index on email for quicker lookups

// Pre-save hook to normalize email
UserSchema.pre("save", function (next) {
  if (this.email) {
    this.email = this.email.toLowerCase(); // Normalize email to lowercase before saving
  }
  next();
});

export default mongoose.model("UsersModel", UserSchema);
