let mongoose = require("mongoose");
mongoose.Promise = global.Promise;
let Schema = mongoose.Schema;

let EyeBleachSchema = new Schema({
    title: {
        type: String
    },
    url: {
        type: String
    },
    thumbnail: {
        type: String
    },
    upvotes: {
        type: String
    },
    comments: {
        type: String
    },
    notes: [{
        type: Schema.Types.ObjectId,
        ref: "Note"
    }]
});

let EyeBleach = mongoose.model('EyeBleach', EyeBleachSchema);

module.exports = EyeBleach;