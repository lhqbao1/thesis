// import { callLogin } from "../../services/api";
import { useForm } from "antd/es/form/Form";
import { Button, Form, Input, Checkbox, message, notification } from "antd";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Login.scss";
import { callGetLecturerLogin, callGetStudentById, callLogin } from "../../../services/api";
import { doGetAccountAction } from "../../redux/account/accountSlice";
import { useDispatch } from "react-redux";
import { doGetStudentInfoAction } from "../../redux/account/studentSlice";
import { doGetLecturerInfoAction } from "../../redux/account/lecturerSlice";
import { doGetAccountLecturerAction } from "../../redux/account/accountLecturerSlice";





const Login = () => {
  const [form] = useForm();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);
  const dispatch = useDispatch();



  // const dispatch = useDispatch();
  const onSubmit = async (data) => {
    console.log("CLICK");
  };

  const onFinish = async (data) => {
    try {
      const res = await callLogin(data.email, data.password)
      console.log(res.data)
      if (res) {
        if (res.data.payload.user.role === 'student') {
          const resStudent = await callGetStudentById(res.data.payload.user.id)
          if (resStudent) {
            dispatch(doGetStudentInfoAction(resStudent.data.payload))
          }
          dispatch(doGetAccountAction(res.data.payload.user))

        }


        if (res.data.payload.user.role === 'lecturer') {
          const resLecturer = await callGetLecturerLogin(res.data.payload.user.id)
          if (resLecturer) {
            dispatch(doGetLecturerInfoAction(resLecturer.data.payload))
          }
          dispatch(doGetAccountLecturerAction(res.data.payload.user))
        }

        setIsLogin(true)

        setTimeout(() => {
          setIsLogin(false)
          localStorage.setItem('access_token', res.data.payload.accessToken)
          if (res.data.payload.user.role === 'student') {
            navigate("/student")
          }
          if (res.data.payload.user.role === 'lecturer') {
            navigate("/lecturer")
          }
        }, 1000)


      }
    } catch (error) {
      notification.error({
        message: 'Sai email hoặc mật khẩu!',
        duration: 2
      })
      console.log(error)
    }
  };
  return (
    <div className="login-page">
      <div className="content">
        <div className="left-content"></div>
        <div className="right-content">
          <h2 className="header">Đăng nhập</h2>
          <Form
            form={form}
            name="basic"
            labelCol={{
              span: 24,
            }}
            wrapperCol={{
              span: 16,
            }}
            style={{
              maxWidth: 800,
              marginLeft: 100,
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            // onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Email"
              name="email"
              className="input"
              rules={[
                {
                  required: true,
                  message: "Bạn chưa nhập email!",
                },
              ]}
              style={{
                borderRadius: 20,
              }}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Mật khẩu"
              name="password"
              className="input"
              rules={[
                {
                  required: true,
                  message: "Bạn chưa nhập mật khẩu!",
                },
              ]}
              style={{
                borderRadius: 20,
              }}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 6,
                span: 24,
              }}
            >
              <Button
                className="login-button"
                htmlType="submit"
                loading={isLogin}

              >
                Đăng nhập
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;
