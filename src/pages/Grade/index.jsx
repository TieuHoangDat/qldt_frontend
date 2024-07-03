import { useSelector } from "react-redux";
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

const Grade = () => {
	const { terms } = useSelector((state) => state.terms);

	return (
		<div className={styles.container}>
			
			{terms.length !== 0 &&
							terms.map((term, index) => (
				<TableContainer component={Paper} className={styles.table_container}>
				<div className={styles.head}>
					<h1>
						{term.term}
					</h1>
					
				</div>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell align="center">STT</TableCell>
							<TableCell align="center">Mã môn học</TableCell>
							<TableCell align="center">Tên môn học</TableCell>
							<TableCell align="center">Số tín chỉ</TableCell>
							<TableCell align="center">Điểm (10)</TableCell>
							<TableCell align="center">Điểm (4)</TableCell>
							<TableCell align="center">Điểm (C)</TableCell>
						</TableRow>
					</TableHead>

						<TableBody>
							{term.li.map((gr, index) => (
								<TableRow >
									<TableCell align="center">{index+1}</TableCell>
									<TableCell align="center">{gr.group.course.id}</TableCell>
									<TableCell align="center">{gr.group.course.name}</TableCell>
									<TableCell align="center">{gr.group.course.num_credit}</TableCell>
									<TableCell align="center">{gr.grade_10}</TableCell>
									<TableCell align="center">{gr.grade_4}</TableCell>
									<TableCell align="center">{gr.grade_a}</TableCell>

								</TableRow>
							))}
						</TableBody>

				</Table>
				<Table>
					<TableBody>			
						<TableRow>
							<TableCell>
								<div style={{ marginLeft: '20px' }}>
									<p>- Điểm trung bình học kỳ hệ 4:	{term.avg_4}</p>
									<p>- Điểm trung bình học kỳ hệ 10:	{term.avg_10}</p>
									<p>- Số tín chỉ đạt học kỳ:			{term.total_credit}</p>
								</div>
							</TableCell>
							<TableCell>
								<p>- Điểm trung bình tích lũy hệ 4:		{term.tl_4}</p>
								<p>- Điểm trung bình tích lũy hệ 10:	{term.tl_10}</p>
								<p>- Số tín chỉ tích lũy:				{term.tl_credit}</p>
							</TableCell>
						</TableRow>
					</TableBody>
				</Table>
				<div>
				



				</div>
			</TableContainer>
		))}
		</div>
	);
};

export default Grade;
