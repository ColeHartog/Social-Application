var mongoose = require("mongoose");

var ChatRoomSchema = new mongoose.Schema({
    users: [{type: mongoose.Schema.Types.ObjectId, ref: "User"}],
    messages: [{
        createdAt: {type: "Date", default: Date.now},
        author: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
        text: {type: "String"}
    }]
});

module.exports = mongoose.model("ChatRoom", ChatRoomSchema)