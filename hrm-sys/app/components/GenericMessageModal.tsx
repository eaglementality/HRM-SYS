import { Button, Modal } from "antd";
import  question from '../img/helpothers.png';
import  warning from '../img/warning.png';
import  success from  '../img/success.png';
import Image from "next/image";
interface Props {
  title?: "Success" | "Warning" | "Confirm";
  icon?: "Success" | "Warning" | "Confirm";
  message?: string;
  width?: number;
  okHandler?: () => void;
  disableCancel?: boolean;
  cancelHandler?: () => void;
  okText?: string;
  cancelText?: string;
  open?: boolean;
}
export const GenericMessageModal = ({
  title,
  icon,
  message,
  width,
  okHandler,
  disableCancel,
  cancelHandler,
  cancelText,
  okText,
  open,
}: Props) => {
  return (
    <Modal
      title={title}
      open={open}
      onOk={okHandler}
      okButtonProps={{ style: { backgroundColor: "#0747a1" } }}
      cancelButtonProps={disableCancel ? { style: { display: "none" } } : {}}
      maskClosable={true}
      centered
      width={width ?? 380}
      onCancel={cancelHandler}
      okText={okText ? okText : icon == "Confirm" ? "Yes, Save" : "Ok"}
      style={{
        border: "1px solid rgb(96 165 250)",
        borderRadius: 9,
        zIndex: 100000,
      }}
      transitionName=""
      footer={[
        <Button
          className="bg-blue-800"
          onClick={okHandler}
          key="save"
          type="primary"
        >
          {okText ? okText : icon == "Confirm" ? "Yes, Save" : "Ok"}
        </Button>,
        !disableCancel && (
          <Button onClick={cancelHandler} key="cancel">
            {cancelText}
          </Button>
        ),
      ]}
      cancelText={cancelText}
    >
      <div className="flex flex-row items-center">
        <span style={{ width:50 }} className="pr-3">
          <Image
            src={
              icon === "Confirm"
                ? question
                : icon === "Warning"
                ? warning
                : success
            }
            alt=""
          />
        </span>
        <div style={{ whiteSpace: "pre-wrap", width: "calc(100% - 50px)" }}>
          {message}
        </div>
      </div>
    </Modal>
  );
};
