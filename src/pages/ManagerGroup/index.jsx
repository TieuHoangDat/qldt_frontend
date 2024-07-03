import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Button from "../../components/Button";
import styles from "./styles.module.scss";
import {
	TableContainer,
	Table,
	TableHead,
	TableBody,
	TableCell,
	TableRow,
	Paper,
} from "@mui/material";

const ManagerGroup = () => {
	const user = useSelector((state) => state.auth.user);

	const [groups, setGroups] = useState([]);


	const base_url = process.env.REACT_APP_API_URL;

	useEffect(() => {
		const url = `${base_url}/time_table/${user.account_id}`;
		
		fetch(url)
			.then(response => response.json())
			.then(data => setGroups(data.data))
			.catch(error => console.error('Error:', error));
	}, [base_url, user.account_id]);


	const handleExport = (id) => {

	};



	return (
		<div className={styles.container}>
			<div className={styles.head}>
				<h1>
					Quản lý nhóm học
				</h1>

			</div>

			
			
			<TableContainer component={Paper} className={styles.table_container}>
			<div className={styles.head}>
				<h1>
					Danh sách các nhóm học giảng viên đang giảng dạy
				</h1>
				
			</div>
			<Table>
				<TableHead>
					<TableRow>
						<TableCell align="center">Tên môn học</TableCell>
						<TableCell align="center">Tên nhóm học</TableCell>
						<TableCell align="center">Thứ</TableCell>
						<TableCell align="center">Kíp</TableCell>
						<TableCell align="center">Phòng</TableCell>
						<TableCell align="center">Số sinh viên</TableCell>
						<TableCell align="center"></TableCell>
					</TableRow>
				</TableHead>		
					<TableBody>
						{groups.length !== 0 &&
							groups.map((group, index) => (
								<TableRow key={group.id} >
									<TableCell align="center">{group.course.name}</TableCell>
									<TableCell align="center">{group.groupName}</TableCell>
									<TableCell align="center">{group.dayOfWeek}</TableCell>
									<TableCell align="center">{group.period}</TableCell>
									<TableCell align="center">{group.room}</TableCell>
									<TableCell align="center">{group.maxStudents - group.availableSlots}</TableCell>
									<TableCell align="center">
										<Button  label="Xuất excel" 
											className={styles.add_btn}
											onClick={() => handleExport(group.groupId)}
										/>
									</TableCell>
								</TableRow>
							))}
						{groups.length === 0 && (
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
			</Table>
			</TableContainer>

		</div>
	);
};

export default ManagerGroup;
