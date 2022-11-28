import { Schema, Types, model } from 'mongoose';

// 1. Create an interface representing a document in MongoDB.
interface IUser {
    fullName: string;
    email: string;
    password: string;
    enabled: boolean;
    role: Types.ObjectId;
}

// 2. Create a Schema corresponding to the document interface.
const usersSchema = new Schema<IUser>(
    {
        fullName: {
            type: Schema.Types.String,
            required: true,
        },
        email: {
            type: Schema.Types.String,
            required: true,
            unique: true,
        },
        password: {
            type: Schema.Types.String,
            required: true,
        },
        enabled: {
            type: Schema.Types.Boolean,
            default: true,
        },
        role: {
            type: Schema.Types.ObjectId,
            ref: 'Role',
            required: true,
            index: true,
        },
    },
    {
        collection: 'users',
        timestamps: true,
    },
);

// 3. Create a Model.
export default model<IUser>('User', usersSchema);
export { IUser };
