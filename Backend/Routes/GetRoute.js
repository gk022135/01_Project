const express = require('express');
const getrouter = express.Router();

const AllClassData = require('../Controllers/Teacher/Send_All_class');
const AllClasstudent = require('../Controllers/Student/AllClassStudent')
const All_Class_Std = require('../Controllers/Student/Student_Subjectwise')
const QrvarificationG1G2 = require('../Controllers/QrvarificationG1G2')
const AllEntries = require('../Controllers/AllEntries')

//student imports
const SingleClassDetail = require('../Controllers/Student/SingleClassDetails')
const VarifyLocation = require('../Controllers/Student/VarifyLocation')
const getDailyActivityHeatmap = require('../Controllers/Student/DailyTrack').getDailyActivityHeatmap;
const { getUserProfile } = require('../Controllers/Student/user');



//teacher Imports
const AttendByStudentEntry = require('../Controllers/Teacher/AttendanceByEntry');
const AllStudentAttendance = require('../Controllers/Teacher/AttendanceByCourse');

//Adminstrator Get Routes
const StudentDeletion = require('../Controllers/Adminstrator/DeleteStudent');


//COMMUNITY IMPORTS
const RetriveAllPost = require('../Controllers/CommunityStuff/RetriveAllPosts');
const ShowCommentOnPost = require('../Controllers/CommunityStuff/ShowCommentOnPost');
const FetchAllPost = require('../Controllers/CommunityStuff/FetchAllPosts')
const PostDetails = require('../Controllers/CommunityStuff/PostDetails')
const SearchPosts = require("../Controllers/CommunityStuff/searchFilter");


//mislenious routes
const httpToWebsocket = require('../Controllers/web-socket/http-to-ws');
const ListAllUsers = require('../Controllers/web-socket/list-all-users');


// All Get Notification imports
const GetTeacherNotification = require('../Controllers/notification/getAllNotificatio');
const CourseNoti = require('../Controllers/notification/courseNotification');

//notification routes
getrouter.get('/teacher-notifications/:teacherName',GetTeacherNotification);
getrouter.get('/course-notifications/:courseCode',CourseNoti);

//Adminstrator controllers
getrouter.get('/delete-student-adminstrator',StudentDeletion)
getrouter.get('/get-all-class-adm', AllClassData);
getrouter.get('/get-all-class-students', AllClasstudent);
getrouter.get('/student-sub-detail-attendance', All_Class_Std);
getrouter.get('/qrvarification-of-user',QrvarificationG1G2);


//teachers routes
getrouter.get('/get-student-attendance-by-entry',AttendByStudentEntry)
getrouter.get('/get-attendace-all-course',AllStudentAttendance)
getrouter.get('/all-entries-of-user',AllEntries);


//Community  get routes
getrouter.get('/get-all-post',RetriveAllPost);
getrouter.get('/comments-of-post',ShowCommentOnPost);
getrouter.get('/all-posts',FetchAllPost);
getrouter.get('/get-post-details', PostDetails);
getrouter.get('/all-users', ListAllUsers)

getrouter.get("/search-posts", SearchPosts);


//student 
getrouter.get('/get-single-class-details',SingleClassDetail);
getrouter.get('/get-varify-location', VarifyLocation);
getrouter.get('/activity/daily', getDailyActivityHeatmap);
getrouter.get('/my-profile', getUserProfile)


//pyq
const { GetAllPyq } = require('../Controllers/PYQ/AddDriveLink');
getrouter.get('/get-all-pyq', GetAllPyq);

//misclenoius route
// getrouter.get('/verify', httpToWebsocket);


//TODO GET ROUTES
 const  {CompletedTask, GetAllTask } = require('../Controllers/Todo-backend/todo-all');
 getrouter.get('/current-tasks',GetAllTask);
 getrouter.get('/all-completed-tasks',CompletedTask);


module.exports = getrouter;
