exports.homepage=async(req,res)=>{
   
        const locals={
            title:"Notes App",
            description:"Free",
         }
        res.render('index',{
            locals,
            layout:'../views/layouts/home'});

}

exports.about=async(req,res)=>{
   
    const locals={
        title:"About- -nots app",
        description:"Free",
     }
    res.render('about',locals);

}