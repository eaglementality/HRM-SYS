"use client";
import { Button, Form, Input, Select } from "antd";
import { useForm } from "antd/es/form/Form";
import { useState } from "react";
import { GenericMessageModal } from "./GenericMessageModal";
import React from "react";
interface props {
  openAddStaffForm: boolean;
  setOpenAddStaffForm: (e: boolean) => void;
  switchContent?: { viewStaff: boolean; editStaff: boolean };
  selectedRecord?: { id: any; name: string; tag: string };
  getLength?: number;
  refreshDataGrid?: boolean;
  setRefreshDataGrid?: (e: boolean) => void;
}
interface messageModalType {
  icon: "Warning" | "Success" | "Confirm";
  title: "Warning" | "Success" | "Confirm";
  message: string;
  okText: string;
  cancelText: string;
  okHandler: () => void;
  cancelHandler: () => void;
  open: boolean;
  disableCancel: boolean;
}
export const AddStaffForm = ({
  openAddStaffForm,
  setOpenAddStaffForm,
  switchContent,
  selectedRecord,
  getLength,
  setRefreshDataGrid,
  refreshDataGrid,
}: props) => {
  const [messageModalState, setMessageModalState] = useState<messageModalType>({
    icon: "Warning",
    title: "Warning",
    message: "",
    okText: "",
    cancelText: "",
    okHandler: () => {},
    cancelHandler: () => {},
    open: false,
    disableCancel: false,
  });
  const [form] = Form.useForm();

  let formState = {
    name: selectedRecord?.name ?? "",
    tag: selectedRecord?.tag ?? "All Staff",
  };

  const handleOnFinish = async (value: any) => {
    setMessageModalState((prev) => ({
      ...prev,
      icon: "Confirm",
      title: "Confirm",
      message: `Are you sure you want to ${
        switchContent?.editStaff == true ? "edit" : "add"
      } this record ?`,
      okText: `Yes ${switchContent?.editStaff === true ? "edit" : "add"}`,
      cancelText: "No",
      open: true,
      disableCancel: false,
      okHandler: async () => {
        try {
          let res =
            switchContent?.editStaff === true
              ? await fetch(`/api/users/update/${selectedRecord?.id}`, {
                  method: "PATCH",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({ ...value }),
                })
              : await fetch("/api/users/add", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({ ...value, id: Number(getLength!+1) }),
                });
          if (res.ok) {
            setRefreshDataGrid && setRefreshDataGrid(!refreshDataGrid);
            setOpenAddStaffForm(!openAddStaffForm);
            setMessageModalState((prev) => ({ ...prev, open: false }));
            setMessageModalState((prev) => ({
              ...prev,
              icon: "Success",
              title: "Success",
              message: `Record ${
                switchContent?.editStaff === true ? "edited" : "added"
              } successfully`,
              okText: "Ok",
              open: true,
              disableCancel: true,
              okHandler: () => {
                setMessageModalState((prev) => ({ ...prev, open: false }));
              },
            }));
          }
        } catch (err) {
          setOpenAddStaffForm(!openAddStaffForm);
          setMessageModalState((prev) => ({ ...prev, open: false }));
          setMessageModalState((prev) => ({
            ...prev,
            icon: "Warning",
            title: "Warning",
            message: `Record not ${
              switchContent?.editStaff === true ? "edited" : "added"
            }`,
            okText: "Ok",
            open: true,
            disableCancel: true,
            okHandler: () => {
              setMessageModalState((prev) => ({ ...prev, open: false }));
            },
          }));
        }
      },
      cancelHandler: () => {
        setMessageModalState((prev) => ({ ...prev, open: false }));
      },
    }));
  };

  return (
    <>
      <GenericMessageModal
        icon={messageModalState.icon}
        title={messageModalState.title}
        message={messageModalState.message}
        open={messageModalState.open}
        disableCancel={messageModalState.disableCancel}
        okText={messageModalState.okText}
        cancelText={messageModalState.cancelText}
        okHandler={messageModalState.okHandler}
        cancelHandler={messageModalState.cancelHandler}
      />
      {switchContent?.viewStaff === false && (
        <Form
          className="flex flex-col justify-center p-5 py-8 "
          form={form}
          onFinish={handleOnFinish}
        >
          <Form.Item initialValue={switchContent?.editStaff === true ? selectedRecord?.name:''} name={"Name"} label={<p>Full Name</p>}>
            <Input
              // defaultValue={formState.name}
              // value={selectedRecord?.name}
              className="h-[45px]"
            />
          </Form.Item>
          <Form.Item initialValue={switchContent?.editStaff === true ? selectedRecord?.tag : ''} name={"tag"} label={<p>Category</p>}>
            <Select
              // defaultValue={formState.tag}
              // value={selectedRecord?.tag}
              className="h-[45px] w-52"
              placeholder="select employee type"
              options={[
                { value: "Teaching Staff", label: "Teaching Staff" },
                { value: "Non Teaching Staff", label: "Non Teaching Staff" },
              ]}
            />
          </Form.Item>
          <div className="flex flex-col mt-16">
            <Button
              htmlType="submit"
              className="absolute right-[8%] h-10  w-28 bottom-4 font-medium bg-black text-white"
            >
              {switchContent?.editStaff === true ? "Edit" : "Add"}
            </Button>
          </div>
        </Form>
      )}
      {switchContent?.viewStaff === true && (
        <div className="p-5 py-8 grid grid-col space-y-4">
          <h1 className="font-bold text-md">Full Name:</h1>
          <p>{selectedRecord?.name}</p>
          <h1 className="font-bold text-md">Category:</h1>
          <p>{selectedRecord?.tag}</p>
          <div className="flex flex-col mt-16">
            <Button
              onClick={() => {
                setOpenAddStaffForm(!openAddStaffForm);
              }}
              className="absolute right-[8%] h-10  w-28 bottom-4 font-medium bg-black text-white"
            >
              Okay
            </Button>
          </div>
        </div>
      )}
    </>
  );
};
