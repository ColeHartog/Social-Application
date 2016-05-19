var User = require("./../models/userModel.js")
    , ChatRoom = require("./../models/chatRoomModel.js")
    , jwt = require("jsonwebtoken")
    , config = require("./../config.js");

module.exports = {

    Login: function (req, res, next) {
        User.findOne({
            username: req.body.username
        }, function (err, user) {
            if (err) {
                return res.status(500).send(err)
            } else {
                if (user) {
                    if (user.comparePassword(req.body.password)) {
                        var token = jwt.sign({
                            _id: user._id
                            , username: user.username
                        }, config.key);
                        res.status(200).json({
                            login: true
                            , loginToken: token
                        });
                    } else {
                        res.status(200).json({
                            login: false
                            , error: "Incorrect Password"
                        });
                    }
                } else {
                    res.status(200).json({
                        login: false
                        , error: "User Does Not Exist"
                    });
                }
            }
        })
    },

    LoggedIn: function (req, res, next) {
        if (req.get('loginToken')) {
            var token = jwt.verify(req.get('loginToken'), config.key);
            User.findById(token._id).select("_id username profileImgUrl friends requests pending color").populate({path: "friends", select: "username profileImgUrl"}).populate({path: "requests", select: "username profileImgUrl"}).exec(function (err, user) {
                if (err) {
                    res.status(500).send(err)
                } else {
                    if (user) {
                        res.status(200).json({
                            loggedIn: true,
                            user: user
                        });
                    } else {
                        res.status(200).json({
                            loggedIn: false
                        });
                    }
                }
            })
        } else {
            res.status(200).json({
                loggedIn: false
            });
        }
    },

    RegisterNewLogin: function (req, res, next) {
        User.findOne({
            username: req.body.username
        }, function (err, user) {
            if (err) {
                res.status(500).send(err)
            } else {
                if (user) {
                    res.status(200).json({
                        createdUser: false
                        , error: 'Username Already In Use'
                    });
                } else {
                    User.create(req.body, function (err, newUser) {
                        if (err) {
                            res.status(500).send(err)
                        } else {
                            if (newUser) {
                                var token = jwt.sign({
                                    _id: newUser._id
                                    , username: newUser.username
                                }, config.key);
                                res.status(200).json({
                                    registered: true
                                    , loginToken: token
                                });
                            } else {
                                res.status(200).json({
                                    registered: false
                                });
                            }
                        }
                    })
                }
            }
        })
    },
    
    AddFriend: function(req, res, next){
        var token = jwt.verify(req.get('loginToken'), config.key);
        User.findById(req.params.id, function(err, user){
            if(err){
                res.send(500).send(err);
            }else{
                if(user.pending.indexOf(token._id) !== -1){
                    User.findByIdAndUpdate(token._id, {$pull: {"requests": user._id}, $addToSet: {"friends": user._id}}, function(err, cuser){
                        if(err){
                            res.send(500).send(err);
                        }else{
                            User.findByIdAndUpdate(user._id, {$pull: {"pending": cuser._id}, $addToSet: {"friends": cuser._id}}, function(err, user){
                                if(err){
                                    res.send(500).send(err);
                                }else{
                                    res.status(200).json({status: "You are now friends"})
                                }
                            })
                        }
                    })
                }else{
                    User.findByIdAndUpdate(token._id, {$addToSet: {"pending": user._id}}, function(err, cuser){
                        if(err){
                            res.send(500).send(err);
                        }else{
                            User.findByIdAndUpdate(user._id, {$addToSet: {"requests": cuser._id}}, function(err, user){
                                if(err){
                                    res.send(500).send(err);
                                }else{
                                    res.status(200).json({status: "Friend Request Sent"})
                                }
                            })
                        }
                    })
                }
            }
        })
    },
    
    GetUsers: function(req, res, next){
        User.find().populate({path: "friends", select: "username"}).exec(function(err, users){
            if(err){
                res.status(500).json(err);
            }else{
                res.status(200).json(users);
            }
        })
    },
    
    FindUsersByName: function(req, res, next){
        var token = jwt.verify(req.get('loginToken'), config.key);
        User.find({$and: [{username: {$regex: req.query.username}}, {_id: {$ne: token._id}}]}).sort({'username': 1}).limit(15).select("username profileImgUrl").exec(function(err, users){
            if(err){
                res.status(500).send(err);
            }else{
                res.status(200).json(users);
            }
        })
    },
    
    UpdateColor: function(req, res, next){
        var token = jwt.verify(req.get('loginToken'), config.key);
        User.findByIdAndUpdate(token._id, {color: req.body.color}, function(err, user){
            if(err){
                res.status(500).send(err);
            }else{
                res.status(200).json({status: "Color Updated"})
            }
        })
    },
    
    UpdateProfileImgUrl: function(req, res, next){
        var token = jwt.verify(req.get('loginToken'), config.key);
        User.findByIdAndUpdate(token._id, {profileImgUrl: req.body.url}, function(err, user){
            if(err){
                res.status(500).send(err);
            }else{
                res.status(200).json({status: "ProfileImg Updated"})
            }
        })
    },
    
    GetChatRoom: function(req, res, next){
        var token = jwt.verify(req.get('loginToken'), config.key);
        ChatRoom.findOne({$and: [{users: {$in: [token._id]}},{users: {$in: [req.params.id]}} ]}).populate({path: "users", select: "username profileImgUrl"}).populate({path: "messages.author", select: "username profileImgUrl"}).exec(function(err, PEChatRoom){
            if(err){
                console.log(err);
                res.status(500).send(err);
            }else{
                if(PEChatRoom){
                    res.status(200).json({chatRoom: PEChatRoom});
                }else{
                    ChatRoom.create({users: [token._id, req.params.id]}, function(err, newChatRoom){
                        if(err){
                            res.status(500).send(err);
                        }else{
                            res.status(200).json({chatRoom: newChatRoom});
                        }
                    })
                }
            }
        })
    },
    
    AddMessageToChat: function(req, res, next){
        var token = jwt.verify(req.get('loginToken'), config.key);
        ChatRoom.findByIdAndUpdate(req.params.id, {$push: {"messages": {"author": token._id, text: req.body.text}}}, function(err, chatRoom){
            if(err){
                res.status(500).send(err);
            }else{
                res.status(200).json({status: "Message Sent"});
            }
        })
    }

}