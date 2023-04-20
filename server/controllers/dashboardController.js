
const Note = require("../models/Notes");
const mongoose = require("mongoose");

exports.dashboard = async (req, res) => {

  let perPage = 8;
  let page = req.query.page || 1;

  const locals = {
    title: "Dashboard",
    description: "ok.",
  };

  try {
  
    // const notes = await Note.aggregate([
    //   { $sort: { updatedAt: -1 } },
    //   { $match: { user: mongoose.Types.ObjectId(req.user.id) } },
    //   {
    //     $project: {
    //       title: { $substr: ["$title", 0, 30] },
    //       body: { $substr: ["$body", 0, 100] },
    //     },
    //   }
    //   ])
    // .skip(perPage * page - perPage)
    // .limit(perPage)
    // .exec(); 

    // const count = await Note.count();

    // res.render('dashboard/index', {
    //   userName: req.user.firstName,
    //   locals,
    //   notes,
    //   layout: "../views/layouts/dashboard",
    //   current: page,
    //   pages: Math.ceil(count / perPage)
    // });
 
  
    Note.aggregate([
      { $sort: { updatedAt: -1 } },
      { $match: { user: mongoose.Types.ObjectId(req.user.id) } },
      {
        $project: {
          title: { $substr: ["$title", 0, 30] },
          body: { $substr: ["$body", 0, 100] },
        },
      },
    ])
      .skip(perPage * page - perPage)
      .limit(perPage)
      .exec(function (err, notes) {
        Note.count().exec(function (err, count) {
          if (err) return next(err);
          res.render("dashboard/index", {
            userName: req.user.firstName,
            locals,
            notes,
            layout: "../views/layouts/dashboard",
            current: page,
            pages: Math.ceil(count / perPage),
          });
        });
      });

  } catch (error) {
    console.log(error);
  }
};


exports.viewNote=async(req,res)=>{
 const note=await Note.findById({_id:req.params.id}).where({
    user: req.user.id
 }).lean();

 if(note){
    res.render('dashboard/viewNotes',{
        noteID:req.params.id,
        note,
        layout:'../views/layouts/dashboard'
    });
 }else{
    res.send("something went wrong")
 }
}

exports.updateNote=async(req,res)=>{
    try{
        await Note.findOneAndUpdate(
            {
                _id:req.params.id
            },
            {
                title:req.body.title,
                body:req.body.body,
                updatedAt:Date.now()
            }
        ).where({user:req.user.id})
        res.redirect('/dashboard');
    }
    catch(error){
        console.log(error)
    }
}

exports.deleteNote=async(req,res)=>{
    try{   console.log(req.params.id);
          await Note.deleteOne({_id:req.params.id}).where({user:req.user.id});
          res.redirect('/dashboard');
    }catch(error)
    {
        console.log(error);
    }
}
exports.addNote=async(req,res)=>{
res.render('dashboard/addNote',{
    layout:'../views/layouts/dashboard'
})
}

exports.submitNewNote=async(req,res)=>{
    try{
    req.body.user=req.user.id;
    await Note.create(req.body);
    res.redirect('/dashboard')
    }catch(error){
        console.log(error);
    }
}
// exports.search=async(req,res)=>{
//     try{
// res.render('dashboard/search',{
//     searchResults:'',
//     layout:'../views/layouts/dashboard'
// })

//     }
//     catch(error){

//     }
// }

exports.submitSearch=async(req,res)=>{
  try{
    let searchTerm=req.body.searchTerm;
    const searchNospeacialChars=searchTerm.replace(/[^a-zA-Z0-9 ]/g, "")
    const searchResults=await Note.find({
        $or:[
            {
                title:{$regex:new RegExp(searchNospeacialChars,'i')}
            },
            {
                body:{$regex:new RegExp(searchNospeacialChars,'i')}
            }
        ]
    }).where({user:req.user.id})
    
    res.render("dashboard/search", {
        searchResults,
        layout: "../views/layouts/dashboard",
      });
  }catch(error){
    console.log(error)
  }
}
// exports.deleteAll=async(req,res)=>{
//   try{
//     console.log("delteing.....")
//   await Note.deleteMany({});
//   }catch(error){
//     console.log(error);
//   }
// }