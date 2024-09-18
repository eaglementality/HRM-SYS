"use client";
import { AddStaffForm } from "@/app/components/addStaffForm";
import { GenericMessageModal } from "@/app/components/GenericMessageModal";
import Table_template from "@/app/components/table";
import { Button, Modal, Select } from "antd";
import { useState } from "react";

export default function AdminView() {
  const [openAddStaffForm, setOpenAddStaffForm] = useState<boolean>(false);
  const [selectedRecord, setSelectedRecord] = useState<{
    name: string;
    tag: string;
  }>({
    name: "",
    tag: "",
  });
  const [switchContent, setSwitchContent]=useState({
    viewStaff:false,
    editStaff:false,
  })
  return (
    <>
      <GenericMessageModal />
      <Modal
        centered
        open={openAddStaffForm}
        footer={null}
        closable={true}
        onClose={() => {
          setOpenAddStaffForm(false);
        }}
        maskClosable={true}
        destroyOnClose={true}
      >
        <AddStaffForm
          openAddStaffForm={openAddStaffForm}
          setOpenAddStaffForm={setOpenAddStaffForm}
          switchContent={switchContent}
          selectedRecord={selectedRecord}
        />
      </Modal>
      <main className="flex flex-col justify-center p-8">
        <h1 className="text-xl font-bold">{`Employees`}</h1>
        <div className="flex gap-10 rounded-md shadow-md my-5 mx-8 justify-between py-4 px-[20%]">
          <div className="grid space-y-4">
            <p>{`teaching staff`}</p>
            <p className="text-center text-4xl">{`120`}</p>
          </div>
          <div className="grid space-y-4">
            <p>{`non teaching staff`}</p>
            <p className="text-center text-4xl">{`60`}</p>
          </div>
        </div>
        <section className="px-5 pt-14">
          <div className="mb-5 flex justify-between ">
            <Select
              className="h-[50px] w-52"
              placeholder="select employee type"
              options={[
                { value: "teaching staff", label: "teaching staff" },
                { value: "Non-teaching staff", label: "Non-teaching staff" },
              ]}
            />
            <Button
              onClick={() => {
                setOpenAddStaffForm(true);
                setSwitchContent((prev)=>({...prev, editStaff:false}))
              }}
              className="h-[50px] w-52 bg-black text-white"
            >
              Add staff
            </Button>
          </div>
          <Table_template
            openAddStaffForm={openAddStaffForm}
            setOpenAddStaffForm={setOpenAddStaffForm}
            switchContent={switchContent}
            setSwitchContent={setSwitchContent}
            selectedRecord={selectedRecord}
            setSelectedRecord={setSelectedRecord}
          />
        </section>
      </main>
    </>
  );
}
