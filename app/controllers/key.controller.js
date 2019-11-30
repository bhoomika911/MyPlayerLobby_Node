// var CryptoJS = require("crypto-js");
// var jwt = require('jsonwebtoken');
// const Key = require('./../models/key.model.js');
// const constants = require('./../constants/constant.js');
// const mongoose = require('mongoose');
// const Clarifai = require('clarifai');
// const clarifai = new Clarifai.App({
//   apiKey: constants.CLARIFY_API_KEY
// });

// // Create and Save a new key
// exports.create = (req, res) => {
//   //Validate token
//   if((!req.headers) ||
//      (!req.headers.token) ||
//       (!req.headers.userid)) {
//       return res.send({
//           status : "failure",
//           code : 401,
//           message : "Missing headers",
//         });
//   }else{
//     jwt.verify(req.headers.token, constants.ENCRYPTION_KEY, function(err, decoded) {
//       if (err) {
//         return res.send({
//             status : "failure",
//             code : 500,
//             message : "Invalid token",
//           });
//       }else{
//         if((!req.body) ||
//            (!req.body.description) ||
//            (!req.body.images)) {
//             return res.send(
//               {
//                 status : "failure",
//                 code : 400,
//                 message : "Missing parameters",
//               });
//         }

//         let userId = req.headers.userid;
//         let images = req.body.images;
//         let description = req.body.description;

//         const key = new Key({
//           userId : userId,
//           images : images,
//           description : description
//         });

//         key.save()
//         .then(keyData => {
//           let keyImagesList = [];
//           images.forEach(function(obj){
//             keyImagesList.push({
//               url : obj,
//               metadata : {
//                 userId : req.headers.userid,
//                 keyId : keyData._id
//               }
//             });
//           });

//           clarifai.inputs.create(keyImagesList)
//           .then(function(response){
//             res.send({
//                 status : "success",
//                 code : 200,
//                 message : "key added successfully.",
//                 data : {
//                   keyId : keyData._id
//                 }
//               });
//           },
//           function(err){
//             let message = err.message || "Some error occurred while creating the User.";

//             return res.send(
//               {
//                 status : "failure",
//                 code : 500,
//                 message : message,
//               });
//           });
//         }).catch(err => {
//           let message = err.message || "Some error occurred while creating the User.";

//           return res.send(
//             {
//               status : "failure",
//               code : 500,
//               message : message,
//             });
//         });
//       }
//     });
//   }
// };

// // delete key
// exports.delete = (req, res) => {
//   //Validate token
//   if((!req.headers) ||
//      (!req.headers.token)) {
//       return res.send({
//           status : "failure",
//           code : 401,
//           message : "token is missing in headers",
//         });
//   }else{
//     jwt.verify(req.headers.token, constants.ENCRYPTION_KEY, function(err, decoded) {
//       if (err) {
//         return res.send({
//             status : "failure",
//             code : 500,
//             message : "Invalid token",
//           });
//       }else{
//         if((!req.params) ||
//            (!req.params.keyId)) {
//             return res.send(
//               {
//                 status : "failure",
//                 code : 400,
//                 message : "Missing parameters",
//               });
//         }

//         let userId = req.headers.userid;
//         let keyId = req.params.keyId;

//         Key.findOne({
//           _id: keyId,
//         })
//         .then(data => {
//           if(data == null){
//             return res.send(
//               {
//                 status : "failure",
//                 code : 500,
//                 message : "key not found to delete",
//               });
//           }else{
//             Key.remove({
//               _id: keyId
//             })
//             .then(data => {
//               return res.send(
//                 {
//                   status : "success",
//                   code : 200,
//                   message : "Key deleted successfully",
//                 });
//             })
//             .catch(err => {
//               let message = err.message || "Some error occurred while deleting the key.";
//               return res.send(
//                 {
//                   status : "failure",
//                   code : 500,
//                   message : message,
//                 });
//             });
//           }
//         })
//         .catch(err => {
//           let message = err.message || "Some error occurred while deleting the key.";
//           return res.send(
//             {
//               status : "failure",
//               code : 500,
//               message : message,
//             });
//         });
//       }
//     });
//   }
// };

// // get keyList by userId
// exports.findAll = (req, res) => {
//   //Validate token
//   if((!req.headers) ||
//      (!req.headers.token)) {
//       return res.send({
//           status : "failure",
//           code : 401,
//           message : "token is missing in headers",
//         });
//   }else{
//     jwt.verify(req.headers.token, constants.ENCRYPTION_KEY, function(err, decoded) {
//       if (err) {
//         return res.send({
//             status : "failure",
//             code : 500,
//             message : "Invalid token",
//           });
//       }else{
//         let userId = req.headers.userid;

//         Key.find({
//           userId: userId,
//         })
//         .then(data => {
//           if(data == null){
//             return res.send(
//               {
//                 status : "failure",
//                 code : 500,
//                 message : "Key List not found for this user",
//               });
//           }else{
//             return res.send(
//               {
//                 status : "success",
//                 code : 200,
//                 data : data
//               });
//           }

//         })
//         .catch(err => {
//           let message = err.message || "Some error occurred while getting the keylist for user.";
//           return res.send(
//             {
//               status : "failure",
//               code : 500,
//               message : message,
//             });
//         });
//       }
//     });
//   }
// };

// // Update  key
// exports.update = (req, res) => {
//   //Validate token
//   if((!req.headers) ||
//      (!req.headers.token)) {
//       return res.send({
//           status : "failure",
//           code : 401,
//           message : "token is missing in headers",
//         });
//   }else{
//     jwt.verify(req.headers.token, constants.ENCRYPTION_KEY, function(err, decoded) {
//       if (err) {
//         return res.send({
//             status : "failure",
//             code : 500,
//             message : "Invalid token",
//           });
//       }else{
//         if((!req.body) ||
//            (!req.body.keyId) ||
//            (!req.body.description) ||
//            (!req.body.images)) {
//             return res.send(
//               {
//                 status : "failure",
//                 code : 400,
//                 message : "Missing parameters",
//               });
//         }

//         let userId = req.headers.userid;
//         let images = req.body.images;
//         let keyId = req.body.keyId;

//         Key.findOneAndUpdate({_id : keyId}, {
//           images : images,
//           description : req.body.description
//         }, {new: true})
//         .then(keyData => {
//           return res.send({
//               status : "success",
//               code : 200,
//               message : "key updated successfully.",
//             });
//         }).catch(err => {
//           let message = err.message || "Some error occurred while updating the key.";

//           return res.send(
//             {
//               status : "failure",
//               code : 500,
//               message : message,
//             });
//         });
//       }
//     });
//   }
// };

// // Search key
// exports.search = (req, res) => {
//   //Validate token
//   if((!req.headers) ||
//      (!req.headers.token) ||
//       (!req.headers.userid)) {
//       return res.send({
//           status : "failure",
//           code : 401,
//           message : "Missing headers",
//         });
//   }else{
//     jwt.verify(req.headers.token, constants.ENCRYPTION_KEY, function(err, decoded) {
//       if (err) {
//         return res.send({
//             status : "failure",
//             code : 500,
//             message : "Invalid token",
//           });
//       }else{
//         if((!req.body) ||
//            (!req.body.searchImageUrl)) {
//             return res.send(
//               {
//                 status : "failure",
//                 code : 400,
//                 message : "Missing parameters",
//               });
//         }

//         let userId = req.headers.userid;
//         let searchImageUrl = req.body.searchImageUrl;
//         clarifai.inputs.search({
//           input: {
//             url: searchImageUrl,
//             metadata : {
//               userId : req.headers.userid
//             }
//           }
//         }).then(
//           function(response) {
//             if((response.status) &&
//                 (response.status.code == 10000) &&
//                 (response.status.description == "Ok")
//               ){
//                 let hitList = response.hits;
//                 if(response.hits &&
//                   response.hits[0] &&
//                   response.hits[0].score >= 0.20
//                 ){
//                   Key.find({
//                     userId: userId,
//                   },function (err, keyData) {
//                     if(err){
//                       let message = err.message || "Some error occurred while searching key.";

//                       return res.send(
//                         {
//                           status : "failure",
//                           code : 500,
//                           message : message,
//                           error : err
//                         });
//                     }else{
//                       if(keyData == null){
//                         return res.send(
//                           {
//                             status : "success",
//                             code : 200,
//                             message : "No keys match to your search.",
//                             data : []
//                           });
//                       }else{
//                         let newHitList = [];
//                         let tempData = {};

//                         hitList.forEach(function(obj,index){
//                           if(obj.score >= 0.20){
//                             let keyIdFromSearchData = obj.input.data.metadata.keyId;
//                             if(tempData[keyIdFromSearchData]){
//                               if(obj.score > tempData[keyIdFromSearchData].score){
//                                 newHitList[tempData[keyIdFromSearchData].indexTemp].scorePrec = obj.score;
//                               }
//                             }else{
//                               let objKeyData = keyData.filter(function(objKey){
//                                 return objKey._id == keyIdFromSearchData;
//                               });

//                               if(objKeyData.length >= 0){
//                                 tempData[keyIdFromSearchData] = {
//                                   score : obj.score,
//                                   indexTemp : newHitList.length
//                                 };

//                                 newHitList.push({
//                                   scorePrec :  obj.score ,
//                                   keyData : objKeyData[0]
//                                 });


//                               }
//                             }
//                           }
//                         });

//                         return res.send({
//                             status : "success",
//                             code : 200,
//                             message : "Keys found successfully.",
//                             data : newHitList
//                           });
//                       }
//                     }
//                   });
//                 }else{
//                   return res.send(
//                     {
//                       status : "success",
//                       code : 200,
//                       message : "No keys match to your search.",
//                       data : []
//                     });
//                 }
//               }else{
//                 return res.send({
//                   status : "success",
//                   code : 200,
//                   message : "No keys match to your search.",
//                   data : []
//                 });
//               }

//           },
//           function(err) {
//             let message = err.message || "Some error occurred while searching key.";
//             return res.send({
//               status : "failure",
//               code : 500,
//               message : message,
//               error : err
//             });
//           }
//         );
//       }
//     });
//   }
// };
