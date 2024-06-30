import { useSelector } from "react-redux";
import NotificationTable from "../../components/Tables/NotificationTable"; // Thay đổi
import styles from "./styles.module.scss";

const Home = () => {
	const { notifications } = useSelector((state) => state.notifications); // Thay đổi 

	return (
		<div className={styles.container}>
			<div className={styles.head}>
				<h1>
					Thông báo từ phòng giáo vụ 
				</h1>
			</div>
			<NotificationTable notifications={notifications} /> {/* Thay đổi */}
		</div>
	);
};

export default Home;