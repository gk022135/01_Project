const express = require('express');
const router = express.Router();

const signupctrl  = require('../Controllers/Student/SignCtrl');
const signUpValidation = require('../Middlewares/SignMidware');
const LoginValid = require('../Middlewares/LoginMidware')
const LoginCtrl = require('../Controllers/Student/LoginCtr')
const OtpVarification = require('../Controllers/OtpVarification');
const GoogleLogin = require('../Controllers/GoogleSignup')
const QrVarifi = require('../Controllers/Qr_varifi')

const AdminSignup = require('../Controllers/Teacher/AdminSignup')
const AdminLogin = require('../Controllers/Teacher/AdminLogin')
const ClassCreate = require('../Controllers/Teacher/Class_Create')
const Attendance_marking = require('../Controllers/Student/Attendance_Marking')

const DeleteCourse = require('../Controllers/Teacher/DeleteRequest')
const Notification = require('../Controllers/Teacher/AddNotification')


const AdminstratorLogin = require('../Controllers/Adminstrator/AdmistrtorLogin')


//COMMUNITY IMPORT HERE
const MakeApost = require('../Controllers/CommunityStuff/MakePost')


//image upload 
const ImageUploader = require('../Controllers/CommunityStuff/ImageUploader');
 


//notifications imports
const TeacherNotification = require('../Controllers/notification/addNotification')


//todos imports
const {AddNewTask} = require('../Controllers/Todo-backend/todo-all')
router.post('/add-new-task', AddNewTask);

// 
router.post('/signup',signUpValidation, signupctrl);
router.post('/login', LoginCtrl);
router.post('/optvarification', OtpVarification);
router.post('/google-login-data', GoogleLogin);
router.post('/qr-scan-varification',QrVarifi);
router.post('/admin-sign-up', AdminSignup);
router.post('/admin-login',AdminLogin)

router.post('/ClassCreate', ClassCreate)
router.post('/attendance-marking',Attendance_marking)
router.post('/notification',Notification);

router.delete('/delete-course/:courseId', DeleteCourse);


//admins works from here
router.post('/adminstrator-login',AdminstratorLogin)



//COMMUNITY STUFF HERE
router.post('/make-a-post',MakeApost);
router.post('/upload-the-image',ImageUploader);



//notifications routes
router.post('/teacher-notification',TeacherNotification);


//pyq
const { AddPyq, GetAllPyq } = require('../Controllers/PYQ/AddDriveLink');
router.post('/add-pyq', AddPyq);

//todos routes are here
// router.post('/adduser', AddUser);
// router.put('/addtask',AddTask)
// router.put('/deletetask',deleteTasks);
// router.put('/completed-tasks',completedTasks);

// router.get('/get-all-tasks/:email',Alltasks)


//reset password routes
const ResetPasswordCtrl = require('../Controllers/auth/reset-password');
const ResetPassVarifyCtrl = require('../Controllers/auth/reset-pass-varify');

router.post('/reset-password/', ResetPasswordCtrl);
router.post('/reset-password-verify', ResetPassVarifyCtrl);

module.exports = router;