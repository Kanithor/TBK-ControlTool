const express = require('express');
const router = express.Router();

const Task = require('../models/task')

// Rutas, se adjuntan unas como ejemplo...


router.get('/',async (req,res)=>{
    const tasks = await Task.find();
    console.log(tasks)
    res.render('index',{
        tasks //tasks: tasks
    });
});

router.post('/add', async (req,res)=>{
    const task = new Task(req.body);
    await task.save();
    res.redirect('/');
});

router.get('/turn/:id', async (req,res)=>{
    const {id} = req.params;
    const task = await Task.findById(id);
    task.status = !task.status;
    await task.save();
    res.redirect('/');
});

router.get('/delete/:id', async (req,res)=>{
    const {id} = req.params; //obtengo id desde req.params
    await Task.remove({_id: id});
    res.redirect('/');
});


module.exports = router;