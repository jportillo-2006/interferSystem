import { Schema, model } from 'mongoose';

const CompanySchema = Schema({
    name: {
        type: String,
        required: [true, 'Company name is required'],
    },
    impactLevel: {
        type: String,
        required: true,
        enum: ['local', 'nacional', 'internacional']
    },
    yearsOfExperience: {
        type: Number,
        required: [true, 'Years of experience are required'],
        min: [0, 'Years of experience cannot be negative']
    },
    category: {
        type: String,
        required: [true, 'Category is required']
    },
    description: {
        type: String,
        maxLength: [500, 'Description cannot exceed 500 characters'],
        default: ''
    },
    phone: {
        type: String,
        required: [true, 'Phone number is required'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
    },
    representative: {
        type: String,
        required: [true, 'Representative name is required'],
    }
}, {
    timestamps: true,
    versionKey: false
});

CompanySchema.methods.toJSON = function() {
    const { __v, _id, ...company } = this.toObject();
    company.uid = _id;
    return company;
};

export default model('Company', CompanySchema);