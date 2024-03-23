import {Schema, model} from 'mongoose'

//like objectType for schema
interface IBook {
    id?:string,
    author:string,
    title:string,
    year:number,
}

const BookSchema = new Schema<IBook>({
    id:String,
    author:{type:String, required: true},
    title:{type:String, required: true},
    year:{type:Number, required: true},
})

const Book = model<IBook>('books',BookSchema)

export default Book;