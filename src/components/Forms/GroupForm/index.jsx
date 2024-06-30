import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { createGroup, updateGroup } from "../../../redux/groupsSlice/apiCalls";
import { toast } from "react-toastify";
import Joi from "joi";
import TextField from "../../Inputs/TextField";
import Button from "../../Button";
import { Paper } from "@mui/material";
import styles from "./styles.module.scss";

const GroupForm = () => {
  const { courseId, groupId } = useParams(); // Lấy cả courseId và groupId

  const [data, setData] = useState({
    groupName: "",
    course: {
      id: courseId,
    },
    dayOfWeek: 2,
    period: 1,
    teacher: {
      account_id: 11,
    },
    room: "",
    maxStudents: 30,
    availableSlots: 30,
    term: {
      id: 1,
    },
  });

  const [errors, setErrors] = useState({
    groupName: "",
    dayOfWeek: "",
    period: "",
    teacher_account_id: "",
    room: "",
    maxStudents: "",
    term_id: ""
  });

  const { groups, createGroupProgress, updateGroupProgress } = useSelector(
    (state) => state.groups
  );

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (groups && groups.length > 0) {
      const group = groups.find((group) => group.groupId === Number(groupId));
      if (groupId !== "new" && group) {
        setData({
		  groupId: group.groupId,
          groupName: group.groupName,
		  course: {
			id: courseId,
		  },
          dayOfWeek: group.dayOfWeek,
          period: group.period,
          teacher: {
            account_id: group.teacher.account_id,
          },
          room: group.room,
          maxStudents: group.maxStudents,
          availableSlots: group.maxStudents,
          term: {
            id: group.term.id,
          },
        });
      }
    }
  }, [groupId, groups]);

  const schema = {
    groupName: Joi.string().required().label("Group Name"),
    dayOfWeek: Joi.number().required().label("Day of Week"),
    period: Joi.number().required().label("Period"),
    teacher_account_id: Joi.number().required().label("Teacher ID"),
    room: Joi.string().required().label("Room"),
    maxStudents: Joi.number().required().label("Max Students"),
    term_id: Joi.number().required().label("Term ID"),
  };

  const handleInputState = (name, value) => {
    if (name === "teacher_account_id") {
      setData((prev) => ({
        ...prev,
        teacher: {
          ...prev.teacher,
          account_id: value,
        },
      }));
    } else if (name === "term_id") {
      setData((prev) => ({
        ...prev,
        term: {
          ...prev.term,
          id: value,
        },
      }));
    } else {
      setData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleErrorState = (name, value) => {
    setErrors((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error } = Joi.object(schema).validate({
      groupName: data.groupName,
      dayOfWeek: data.dayOfWeek,
      period: data.period,
      teacher_account_id: data.teacher.account_id,
      room: data.room,
      maxStudents: data.maxStudents,
      term_id: data.term.id,
    });
    if (!error) {
      if (groupId === "new") {
        const res = await createGroup(data, dispatch);
        res && history.push(`/groupByCourse/${courseId}`);
      } else {
        const res = await updateGroup(groupId, data, dispatch);
        res && history.push(`/groupByCourse/${courseId}`);
      }
    } else {
      toast.error(error.message);
    }
  };

  return (
    <div className={styles.container}>
      <Paper className={styles.form_container}>
        <h1 className={styles.heading}>
          {groupId === "new" ? "Thêm nhóm học" : "Sửa nhóm học"}
        </h1>
        <form onSubmit={handleSubmit}>
          <div className={styles.input_container}>
            <TextField
              name="groupName"
              label="Nhập tên nhóm"
              handleInputState={handleInputState}
              handleErrorState={handleErrorState}
              schema={schema.groupName}
              error={errors.groupName}
              value={data.groupName}
              required={true}
            />
          </div>
          <div className={styles.input_container}>
            <TextField
              name="dayOfWeek"
              label="Nhập ngày trong tuần"
              handleInputState={handleInputState}
              handleErrorState={handleErrorState}
              schema={schema.dayOfWeek}
              error={errors.dayOfWeek}
              value={data.dayOfWeek}
              required={true}
            />
          </div>
          <div className={styles.input_container}>
            <TextField
              name="period"
              label="Nhập tiết học"
              handleInputState={handleInputState}
              required={true}
              value={data.period}
              handleErrorState={handleErrorState}
              schema={schema.period}
              error={errors.period}
            />
          </div>
          <div className={styles.input_container}>
            <TextField
              name="teacher_account_id"
              label="Nhập mã giáo viên"
              handleInputState={handleInputState}
              required={true}
              value={data.teacher.account_id}
              handleErrorState={handleErrorState}
              schema={schema.teacher_account_id}
              error={errors.teacher_account_id}
            />
          </div>
          <div className={styles.input_container}>
            <TextField
              name="room"
              label="Nhập phòng học"
              handleInputState={handleInputState}
              required={true}
              value={data.room}
              handleErrorState={handleErrorState}
              schema={schema.room}
              error={errors.room}
            />
          </div>
          <div className={styles.input_container}>
            <TextField
              name="maxStudents"
              label="Số lượng sinh viên tối đa"
              handleInputState={handleInputState}
              required={true}
              value={data.maxStudents}
              handleErrorState={handleErrorState}
              schema={schema.maxStudents}
              error={errors.maxStudents}
            />
          </div>
          <div className={styles.input_container}>
            <TextField
              name="term_id"
              label="Học kì"
              handleInputState={handleInputState}
              required={true}
              value={data.term.id}
              handleErrorState={handleErrorState}
              schema={schema.term_id}
              error={errors.term_id}
            />
          </div>
          <Button
            type="submit"
            label={groupId === "new" ? "Thêm" : "Cập nhật"}
            isFetching={groupId === "new" ? createGroupProgress : updateGroupProgress}
            style={{ marginLeft: "auto" }}
          />
        </form>
      </Paper>
    </div>
  );
};

export default GroupForm;
