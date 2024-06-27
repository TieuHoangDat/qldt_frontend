import { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { getAllSongs } from "./redux/songsSlice/apiCalls";
import { getAllUsers } from "./redux/usersSlice/apiCalls";
import { getAllCourses } from "./redux/coursesSlice/apiCalls";
import { getAllPlaylists } from "./redux/playlistSlice/apiCalls";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Users from "./pages/Users";
import Songs from "./pages/Songs";
import Courses from "./pages/Courses";
import SongForm from "./components/Forms/SongForm";
import UserForm from "./components/Forms/UserForm";
import CourseForm from "./components/Forms/CourseFrom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";

function App() {
	const user = useSelector((state) => state.auth.user);
	const dispatch = useDispatch();
	const [isSidebarVisible, setSidebarVisible] = useState(true);
	const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

	useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth <= 768);
			if (window.innerWidth > 768) {
				setSidebarVisible(true);
			}
		};

		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	useEffect(() => {
		let token = null;
		const root = JSON.parse(window.localStorage.getItem("persist:root"));

		if (root) {
			const { auth } = root;
			const { user } = JSON.parse(auth);
			if (user) token = user.token;
		}

		if (user && token) {
			getAllSongs(dispatch);
			getAllUsers(dispatch);
			getAllPlaylists(dispatch);
			getAllCourses(dispatch); // them
		}
	}, [dispatch, user]);

	const toggleSidebar = () => {
		setSidebarVisible(!isSidebarVisible);
	};

	return (
		<Switch>
			{/* <Route path="/login" component={Login} /> */}
			{/* {user && user.isAdmin && ( */}
			{
				<Fragment>
					<Navbar />
					{isMobile && (
						<button onClick={toggleSidebar} className="toggle-sidebar-btn">
							<FontAwesomeIcon icon={isSidebarVisible ? faTimes : faBars} />
						</button>
					)}
					<div className={`sidebar-container ${isSidebarVisible ? 'visible' : 'hidden'}`}>
						<Sidebar />
					</div>
					{isSidebarVisible && isMobile && <div className="overlay" onClick={toggleSidebar}></div>}
					<main className={`main ${isSidebarVisible ? '' : 'sidebar-hidden'}`}>
						<Route exact path="/" component={Dashboard} />
						<Route path="/songs/:id" component={SongForm} />
						<Route path="/users/:id" component={UserForm} />
						<Route path="/courses/:id" component={CourseForm} />
						<Route exact path="/users" component={Users} />
						<Route exact path="/songs" component={Songs} />
						<Route exact path="/courses" component={Courses} /> 
					</main> 
				</Fragment>
			}
			{/* )} */} 
			{/* {!user && <Redirect to="/login" />} */}
		</Switch>
	);
}

export default App;
