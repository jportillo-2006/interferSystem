import { Schema, model } from 'mongoose';

const UserSchema = Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        maxLength: [25, 'Cannot exceed 25 characters']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minLength: [8, 'Must have a minimum of 8 characters']
    },
    role: {
        type: String,
        required: true,
        enum: ['ADMIN_ROLE']
    },
},
    {
        timestamps: true,
        versionKey: false
    }
);

UserSchema.methods.toJSON = function(){
    const { __v, password, _id, ...usuario } = this.toObject();
    usuario.uid = _id;
    return usuario;
}

export default model('User', UserSchema);