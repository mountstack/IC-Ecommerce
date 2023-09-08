const Post = require('../Model/Post'); 

async function create(req, res) { 
    req.body.userInfo = req.user._id; 
    
    const {userInfo, title, content} = req.body; 

    const post = new Post({userInfo, title, content}); 
    
    try {
        await post.save(); 
        res.json({
            message: 'Post created successfully'
        }); 
    } catch (error) {
        res.json({
            message: 'Error'
        })
    }
} 

async function findAll(req, res) {
    // const posts = await Post.find().populate('userInfo').populate('comments'); 
    const posts = await Post.find().populate([
        {path: 'userInfo'}, 
        {path: 'comments', populate: { path: 'userInfo' }}
    ]); 
    res.json({
        posts
    }) 
} 

async function findSingle(req, res) {
    // /api/post/:id
    const { id } = req.params; 
    const posts = await Post.findById(id)
                            .populate('userInfo')
                            .populate('comments'); 
    res.json({
        posts
    }) 
} 

module.exports = {
    create, 
    findAll, 
    findSingle
}