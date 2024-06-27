import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { deleteCourse } from "../../../redux/coursesSlice/apiCalls"; // Thay đổi import action từ songs sang courses
import {
	TableContainer,
	Table,
	TableHead,
	TableBody,
	TableCell,
	TableRow,
	Paper,
	IconButton,
	CircularProgress,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import styles from "./styles.module.scss";

const CourseTable = ({ courses }) => {
	const dispatch = useDispatch();
	const [loading, setLoading] = useState(true);

	setTimeout(() => setLoading(false), 1000);

	const handleDelete = (id) => {
		deleteCourse(id, dispatch); // Thay đổi hàm gọi action từ deleteSong sang deleteCourse
	};

	return (
		<TableContainer component={Paper} className={styles.table_container}>
			<Table>
				<TableHead>
					<TableRow>
						<TableCell align="center">Mã môn học</TableCell>
						<TableCell align="center">Tên môn học</TableCell>
						<TableCell align="center">Số tín chỉ</TableCell>
						<TableCell align="center">Học kì</TableCell>
						<TableCell align="center">Actions</TableCell>
					</TableRow>
				</TableHead>
				{loading && (
					<TableBody>
						<TableRow>
							<TableCell align="center">
								<CircularProgress
									style={{ color: "#1ed760", margin: "2rem 0" }}
								/>
							</TableCell>
							<TableCell align="center"></TableCell>
							<TableCell align="center"></TableCell>
							<TableCell align="center"></TableCell>
						</TableRow>
					</TableBody>
				)}
				{!loading && (
					<TableBody>
						{courses.length !== 0 &&
							courses.map((course, index) => (
								<TableRow key={course.id}>
									<TableCell align="center">{course.id}</TableCell>
									<TableCell align="center">{course.name}</TableCell>
									<TableCell align="center">{course.num_credit}</TableCell>
									<TableCell align="center">{course.term}</TableCell>
									<TableCell align="center">
										<Link to={`/courses/${course.id}`}>
											<IconButton className={styles.edit_btn}>
												<EditIcon />
											</IconButton>
										</Link>
										<IconButton
											className={styles.delete_btn}
											onClick={() => handleDelete(course.id)}
										>
											<DeleteIcon />
										</IconButton>
									</TableCell>
								</TableRow>
							))}
						{courses.length === 0 && (
							<TableRow>
								<TableCell align="center"></TableCell>
								<TableCell align="center"></TableCell>
								<TableCell align="center"></TableCell>
								<TableCell align="center">
									<img
										className={styles.no_data_img}
										src="./noData.svg"
										alt=""
									/>
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				)}
			</Table>
		</TableContainer>
	);
};

export default CourseTable;
