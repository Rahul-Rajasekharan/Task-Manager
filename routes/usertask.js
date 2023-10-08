import { Router } from 'express';
import Task from '../models/task.js' 
const router = Router();

// Route to create a new task
router.post('/', async (req, res) => {
  const { title, description, dueDate } = req.body;
  try {
    const newTask = new Task({
      title,
      description,
      dueDate,
    });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(400).json({ error: 'Bad request' });
  }
});

// Route to get all tasks
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Route to update task
router.get('/:taskId', async (req, res) => {
  try {
    const taskId = req.params.taskId;
    const task = await Task.findOne({ _id: taskId });
    if(!task){
      return res.status(404).json({ message: 'Task not found' })
    }
    res.json(task)
  } catch (error) {
    res.status(500).json({ error : 'Server error'})
  }
})

router.put('/:taskId', async (req, res) => {
  const updatedTaskData = req.body;
  const taskId = req.params.taskId;
  try {
    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      updatedTaskData,
      { new: true } // Set { new: true } to return the updated task
    );
  
    if (!updatedTask) {
      return res.status(404).json({ error: 'Task not found' });
    }
  
    // Task updated successfully
    return res.status(200).json(updatedTask);
  } catch (error) {
    // Handle errors here
    console.error('Error updating task:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
})


// Route to delete a task
router.delete('/:taskId', async (req, res) => {
  try {
    const taskId = req.params.taskId;
    const deletedTask = await Task.findByIdAndRemove(taskId);

    if (deletedTask) {
      res.status(200).json({ message: 'Task deleted successfully' });
    } else {
      res.status(404).json({ message: 'Task not found' });
    }
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({ message: 'Internal server error' })
}
});


export default router;

