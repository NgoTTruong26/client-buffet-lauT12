import Axios from "axios";
import styles from "./bookings.module.scss";
import { useForm, SubmitHandler } from "react-hook-form";
import yup from "components/yup/yupGlobal";
import { yupResolver } from "@hookform/resolvers/yup";
import Field from "components/yup/Field";

type Inputs = {
  numberAdults: number;
  numberChildren: number;
  day: string;
  hours: string;
  author: string;
  phone: string;
  email: string;
};

const schema = yup.object().shape({
  numberAdults: yup
    .string()
    .required("Số người đi không được để trống!!")
    .numberAdults(),
  numberChildren: yup.string().numberChildren(),
  day: yup.string().required("Ngày đặt bàn không được để trống!!").day(),
  hours: yup.string().required("Giờ đặt bàn không được để trống!!").hours(),
  author: yup.string().required("Họ và Tên người đặt không được để trống!!"),
  phone: yup
    .string()
    .required("Số điện thoại không được để trống!!")
    .matches(/(((\+|)84)|0)(3|5|7|8|9)+([0-9]{8})\b/, {
      message: "Số điện thoại nhập không hợp lệ!!",
    }),
  email: yup.string().required("Email không được để trống!!").email(),
});

export default function Book() {
  const {
    handleSubmit,
    register,
    /*     watch, */
    formState: { errors },
  } = useForm<Inputs>({ resolver: yupResolver(schema) });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    await Axios.post("http://localhost:3001/bookings/create-booking", {
      data,
    }).then((response) => console.log(response.data));
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.content}>
          <div className={styles.main}>
            <div className={styles.title}>Đặt Bàn</div>
            <div className={styles.order}>
              <div className={styles["column-1"]}>
                <div className={styles["row-1"]}>
                  <div className={styles.adults}>
                    <Field
                      label={true}
                      innerText="Số người"
                      classNameInput={styles.input}
                      type="text"
                      id="numberAdults"
                      error={errors.numberAdults?.message}
                      {...register("numberAdults")}
                    />
                  </div>
                  <div className={styles.children}>
                    <Field
                      label={true}
                      innerText="Số trẻ em"
                      classNameInput={styles.input}
                      type="text"
                      id="numberChildren"
                      error={errors.numberChildren?.message}
                      {...register("numberChildren")}
                    />
                  </div>
                </div>
                <div className={styles["row-2"]}>
                  <div className={styles.day}>
                    <Field
                      label={true}
                      innerText="Ngày"
                      classNameInput={styles.input}
                      type="date"
                      id="day"
                      error={errors.day?.message}
                      {...register("day")}
                    />
                  </div>
                  <div className={styles.hours}>
                    <Field
                      label={true}
                      innerText="Giờ"
                      classNameInput={styles.input}
                      type="time"
                      id="hours"
                      error={errors.hours?.message}
                      {...register("hours")}
                    />
                  </div>
                </div>
                <div className={styles["row-3"]}>
                  <div className={styles.note}>
                    <Field
                      label={true}
                      innerText="Ghi chú"
                      classNameInput={styles.input}
                      type="text"
                      id="note"
                    />
                  </div>
                  <div className={styles.email}>
                    <Field
                      label={true}
                      innerText="Email"
                      classNameInput={styles.input}
                      type="text"
                      id="email"
                      error={errors.email?.message}
                      {...register("email")}
                    />
                  </div>
                </div>
              </div>
              <div className={styles.column}>
                <div className={styles.author}>
                  <Field
                    label={true}
                    innerText="Họ và Tên người đặt"
                    classNameInput={styles.input}
                    type="text"
                    id="author"
                    error={errors.author?.message}
                    {...register("author")}
                  />
                </div>
                <div className={styles.phoneNumber}>
                  <Field
                    label={true}
                    innerText="Số điện thoại"
                    classNameInput={styles.input}
                    type="text"
                    id="phone"
                    error={errors.phone?.message}
                    {...register("phone")}
                  />
                </div>
                <div className={styles.button}>
                  <button type="submit">Đặt bàn</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}