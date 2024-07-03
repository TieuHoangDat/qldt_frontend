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

const Tuition = () => {
	const { terms } = useSelector((state) => state.terms);


	return (
		<div className={styles.container}>
			<div className={styles.head}>
				<h1>
					Xem học phí 
				</h1>
				
			</div>
			<TableContainer component={Paper} className={styles.table_container}>
			<Table>
				<TableHead>
					<TableRow>
						<TableCell align="center">STT</TableCell>
						<TableCell align="center">Học kì</TableCell>
						<TableCell align="center">Số tín chỉ</TableCell>
						<TableCell align="center">Số tín chỉ tích lũy</TableCell>
						<TableCell align="center">Học phí</TableCell>
					</TableRow>
				</TableHead>
					<TableBody>
						{terms.length !== 0 &&
							terms.map((term, index) => (
								<TableRow >
									<TableCell align="center">{index+1}</TableCell>
									<TableCell align="center">{term.term}</TableCell>
									<TableCell align="center">{term.total_credit}</TableCell>
									<TableCell align="center">{term.tl_credit}</TableCell>
									<TableCell align="center">{term.tuition}</TableCell>

								</TableRow>
							))}
						{terms.length === 0 && (
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

export default Tuition;
