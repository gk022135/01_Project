import { BrowserRouter, Routes, Route } from "react-router-dom";
import HashLoader from 'react-spinners/HashLoader';
import './App.css';
import Signup from './signup-login/Signup';
import Login from './signup-login/Login';
import Navbar from './components/Navbar';
import { ToastContainer } from 'react-toastify';
import UserHome from './user-pages/UserHome';
import Otpvarifiacation from "./signup-login/OtpVarification";
import QrScanner from "./QR/QR_Scanner";
import Qr_res from "./user-pages/Qr_res";
import QrGenerator from "./QR/QrGenerator";

import AdminHome from "./Teacher-pages/Admin_Home";
import AdminLogin from "./signup-login/AdminLogin";
import Create_class from "./Teacher-pages/Create_Class";
import All_Class_adm from "./Teacher-pages/All_Class_Ad";
// import TodoHome from "./components/TodoHome";
import All_Class_Std from "./user-pages/All_class_std";
import All_Class from "./user-pages/All_Class";
import PopComponent from "./UiComponents/PopupComponent";
import AddEntryExitQr from "./Teacher-pages/AddEntryExitQr";
import EntriesLog from "./Teacher-pages/AllEntryExits";
import DeleteCourse from "./Teacher-pages/Delete_Class";
import HomeDiscussion from "./Discusion/HomeDiscussion";
import MakePost from "./Discusion/MakePost";
import ImageUpload from "./Discusion/ImageUploadComp";
import SuperUserHome from "./Adminstrator/Super_User_home";
import SUlogin from "./Adminstrator/AdminstratorLogin";
import FacultyDetails from "./Adminstrator/Faculty_Details";
import StudentAuthorise from "./Authorization/StudentAuthorise";
import AdminstratorAuth from "./Authorization/AdminstratorAuth";
import TeacherAuthorise from "./Authorization/TeacherAuthorise";
import Footer from "./UiComponents/Footer";
import LandingPage from "./Landingpage/Landing_page";
import ClassDetailParticular from "./user-pages/ClassDetailParicular";
import QrWorking from "./Documention/QrWorking";
import ClassCreate from "./Documention/ClassCreate";
import GatePassWorking from "./Documention/GatePassWorking";
import AttendanceMarking from "./Documention/AttendanceMarking";
import SetLocation from "./Teacher-pages/SetLoaction";
import VarifyLocation from "./user-pages/VarifiyLocation";
import FetchAllPost from "./Discusion/FetchAllPost";
import PostDetail from "./Discusion/PostDetails";
import ThemeChanger from "./themectrl";
import ThemeSelector from "./themectrl";
import QuizBuilder from "./Teacher-pages/QuizRes";
import Code_editor from "./code_editor/Test";
import WebSock from "./Chart";
import ContributionGraph from "./test/Contri";
import UserProfile from "./user-pages/User_Profile";
import UpdateProfile from "./test/edit-user-profile";
import NotificationManager from "./Teacher-pages/addnotification";
import Chatapp from "./chat/chat";
import Mainnav from "./components/navbar/mainnav";
import RichTextEditor from "./components/text-editor";
import MakePosts from "./components/make-post";
import FetchUserNameEmail from "./chat/user-sidebar";
import Signup2 from "./signup-login/singup-student";
import HotTopicsPosts from "./Discusion/hotTopicPosts";
import MainLayout from "./layouts/aluminies";
import StudentLayout from "./layouts/studentLayout";
import HomeLayout from "./layouts/mainLayout";
import LandingPageAlumni from "./AluminiesNetworks/landingPage";
import UploadPYQ from "./PYQ/upload_pyq";

import TODOHOME1 from "./components/test"
import RenderPyq from "./PYQ/render";
import CommunitiyLayout from "./layouts/communityLayout";
import CategoryCards from "./components/navbar/categories";
import SearchFunction from "./components/navbar/search";
import TeacherLayout from "./layouts/teacherLayout";
import TeacherNavbar from "./components/navbar/teacherNavbar";
import AddResources from "./Teacher-pages/ResourcesAdd";
import Attendance from "./Teacher-pages/AttendanceDetails";
import TeacherProfile from "./Teacher-pages/TeacherProfile";
import ResetPassword from "./signup-login/reset-password";
import OAuthSuccess from "./signup-login/oAuthSuccess";
import LeetCodeEditor from "./code_editor/Test";
import CodingPlatformLayout from "./layouts/codingPlatfromLayout";
import IndividualProblem from "./Codingplatfrom/IndivisiualProblem";


function App() {
  return (
    <BrowserRouter> {/* Wrap everything inside BrowserRouter */}
      {/* <ThemeSelector /> */}
      <>
        <div className='w-full h-auto bg-base-100 90 '>


          <Routes>
            <Route element={<AdminstratorAuth />}>
              <Route path="/qrgenerator" element={<QrGenerator />} />
              <Route path="/delete" element={<DeleteCourse />} />
              <Route path="/administrator" element={<SuperUserHome />} />
              <Route path="/qrrr" element={<AddEntryExitQr />} />

            </Route>




            {/* Teacher Routes */}
            <Route path="/teacher" element={<TeacherLayout />}>
              <Route index element={<AdminHome />} />
              <Route path="all-class" element={<All_Class_adm />} />
              <Route path="create-class" element={<Create_class />} />
              <Route path="attendance" element={<Attendance />} />
              <Route path="set-location" element={<SetLocation />} />
              <Route path="add-resource" element={<AddResources />} />
              <Route path="notifications" element={<NotificationManager />} />
              <Route path="profile" element={<TeacherProfile />} />
            </Route>





            {/* User Routes (Protected by StudentAuthorise) */}
            <Route element={<StudentLayout />} >
              <Route path="/user-home" element={<UserHome />} />
              {/* <Route path="/todo-home" element={<TodoHome />} /> */}
              <Route path="/code-editor" element={<Code_editor />} />

              <Route path="/qrscanner" element={<Qr_res />} />
              <Route path="/pyq" element={<RenderPyq />} />
              <Route path="User-profile" element={<UserProfile />} />
              <Route path="Update" element={<UpdateProfile />} />

              <Route path="/qrscanner" element={<Qr_res />} />
              <Route path="/all-classes" element={<All_Class />} />
              <Route path="/all-classes-student" element={<All_Class_Std />} />
              {/* Dynamic route for each course sending details with query params */}
              <Route path="/all-classes-student/:courseCode/:courseName/:Teacher" element={<ClassDetailParticular />} />
              <Route path="/upload-pyq" element={<UploadPYQ />} />
              <Route path="/setlocation" element={<SetLocation />} />
              <Route path="/varifylocaation/:_id" element={<VarifyLocation />} />
              <Route path="/todo-home" element={<TODOHOME1 />} />

            </Route>

            <Route element={<HomeLayout />} >
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/oauth-success" element={<OAuthSuccess />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/forgot-password" element={<ResetPassword />} />
              <Route path="/otpvarification" element={<Otpvarifiacation />} />
              <Route path='/admin-login' element={<AdminLogin />} />
              <Route path="/administrator-login" element={<SUlogin />} />
              <Route path="/otpvarification" element={<Otpvarifiacation />} />
              {/* Documentation of project */}
              <Route path="/Qr-working-docs" element={<QrWorking />} />
              <Route path="/attendace-marking-docs" element={<AttendanceMarking />} />
              <Route path="/class-creating-docs" element={<ClassCreate />} />
              <Route path="/gatepss-working-docs" element={<GatePassWorking />} />

            </Route>


            {/* Comminitiy Layout */}
            <Route element={<CommunitiyLayout />}>
              <Route path="/all-posts" element={<FetchAllPost />} />
              <Route path="/posts/detail/:id" element={<PostDetail />} />
              <Route path="posts" element={<MakePosts />} />
              <Route path="allusers" element={<FetchUserNameEmail />} />
              <Route path="/hot-topics/:search" element={<HotTopicsPosts />} />
              <Route path="/makepost" element={<MakePost />} />
              <Route path="/discussion" element={<HomeDiscussion />} />
              <Route path="/discussion/makepost" element={<MakePost />} />
              <Route path="/categories" element={<CategoryCards />} />
              <Route path="/search" element={<SearchFunction />} />
              <Route path="/messages" element={<FetchUserNameEmail />} />
              <Route path="/notifications" element={<NotificationManager />} />

              <Route path="/upload" element={<ImageUpload />} />
            </Route>

            {/* alumimies networks layout */}
            <Route element={<MainLayout />}>
              <Route path="/aluminies" element={<LandingPageAlumni />} />
            </Route>

            <Route path="/coding" element={<CodingPlatformLayout />}>
              <Route index element={<Code_editor />} />
               <Route path="layout" element={<IndividualProblem problemId='green' />} />
            </Route>


            <Route path="/quiz" element={<QuizBuilder />} />
            <Route path="/chat" element={<WebSock />} />
            <Route path="/contri" element={<ContributionGraph />} />



            <Route path="noti" element={<NotificationManager />} />
            <Route path="chat-app" element={<Chatapp client2={"user@gmail.com"} />} />
            <Route path="navtest" element={<TeacherNavbar />} />








            <Route path="/popcomp" element={<PopComponent />} />
            <Route path="/leet" element={<LeetCodeEditor />}/>
           



          </Routes>


          {/* <HashLoader color='green' /> */}
          {/* <div className="grid grid-cols-3 text-xl text-white bg-base-100 z-0 p-5 bottom-0">
            <a href="/otpvarification">otpvarification</a>
            <a href="/qrscanner">qrscanner</a>
            <a href="/qrgenerator">qrgenerator</a>
            <a href="/admin-dashboard">teacher-dashboard</a>
            <a href="/admin-login">Teacher-login</a>
            <a href="/user-home">user-home</a>
            <a href="/discussion/makepost">Mkae posts</a>
            <a href="/upload">Image Upload</a>
            <a href="/administrator">Adminstrator Dashboard</a>
            <a href="/administrator-login">Administrator Login</a>
          </div> */}
          {/* <Component /> */}

          {/* <ThemeChanger /> */}
          {/* <RichTextEditor /> */}
          {/* <Footer /> */}
        </div>

        <ToastContainer />
      </>
    </BrowserRouter>
  );
}

export default App;
