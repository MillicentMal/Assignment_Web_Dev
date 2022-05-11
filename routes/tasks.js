const express = require('express');
const task = require('../models/task');
const router = express.Router();
const Task = require('../models/task')
// router.get('/', (req, res) => {
//     res.send("!")
// });

router.get('/v1/tasks', async  (req, res)=> {
    try {
        const tasks = await task.find()
        res.json(tasks)
    } catch (err) {
        res.status(500).json({message : err.message})
    }
});

// Get task by ID
router.get('/v1/tasks/:id', async (req, res) => {
        new_task = await Task.findById(req.params.id);
        
        if (new_task === null) {
          // throw new Error("Cannot find new task");
          res.status(404).json({ message: 'Cannot find task' })
        }
        else {
          try {
        res.send({"id": new_task.id, "title" : new_task.title, "is_completed": new_task.is_completed})
          }catch(err) {
            res.json(err.message)
          }
    // res.send({"title": req.params, "title": req.params.title, "is_completed" : req.params.is_completed});
        }
  });

//  create task
router.post('/v1/tasks/', async (req, res) => {
    const task = new Task({
        title : req.body.title, 
        is_completed : false

    })
    try {
        const newTask = await task.save()
        res.status(201).json({id : newTask.id})

    } catch(err) {
        res.status(400).json({message : err.message})
    }
})

//  delete task using id
router.delete('/v1/tasks/:id',  async (req, res) => {

        new_task = await Task.findById(req.params.id)
        if (new_task != null) {
        const deleted = await new_task.delete();
        res.status(204).json(deleted);
          // throw new Error("Cannot find new task");
        }
          res.json({ message: 'Cannot find task' })
         })

  // update task

  // Updating One
// router.patch('/:id', getTask, async (req, res) => {
//   if (req.body.title != null) {
//     res.taskfind.title = req.body.title
//   }
//   if (req.body.is_completed != null) {
//     res.is_completed = req.body.is_completed
//   }
//   try{
//     const updatedTask = await res.taskfind.save()
//     res.json(updatedTask)
//   } catch (err) {
//     res.status(400).json({ message: err.message })
//   }
// })

router.patch('/v1/tasks/:id',async(req,res)=> {
  try{
      const task = await Task.findById(req.params.id)
      if (req.body.title != null && req.body.is_completed != null ) {
        task.title = req.body.title
        task.is_completed = req.body.is_completed
      const task1 = await task.save()
      res.json(task1) 
      } 
      else if (req.body.is_completed != null && req.body.title === null) {
        task.is_completed = req.body.is_completed  
        const task1 = await task.save()    
            res.json(task1) 
      }
      else if (req.body.title != null) {
        task.title = req.body.title
        const task1 = await task.save()
      res.json(task1) 
      } 
            
  }catch(err){
      res.send(err.message)
  }

})
  async function getTask(req, res, next) {
    let taskfind
    try {
      taskfind = await Task.findById(req.params.id)
      if (taskfind == null) {
        return res.status(404).json({ message: 'Cannot find task' })
      }
    } catch (err) {
      return res.status(500).json({ message: err.message })
    }
  
    res.taskfind = taskfind
    next()
  }
module.exports = router;
