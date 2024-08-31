
import { Schema, model } from 'mongoose';

const logSchema = new Schema({
    level: {
        type: String,
        enum: ['low', 'medium', 'high'],
        default: 'low',
    },
    message: {
        type: String,
        required: true,
    },
    origin: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: new Date(),
    }
});

export const LogModel = model('Log', logSchema);



// ------------------------------
// Esta forma combina la cración y guardado de un registro
// const newLog = await LogModel.create({
//     level: 'medium',
//     message: 'App started',
//     origin: 'App.ts'
// });
// ------------------------------
// Crear instancia
// const newLog = await new LogModel({
//     level: 'medium',
//     message: 'App started',
//     origin: 'App.ts'
// });
//
// Guardar registro
// await newLog.save();
// ------------------------------