"use client";
import { AddStaffForm } from "@/app/components/addStaffForm";
import { GenericMessageModal } from "@/app/components/GenericMessageModal";
import Table_template from "@/app/components/table";
import { Button, Modal, Select } from "antd";
import { use, useEffect, useState } from "react";

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
  const [getLength, setGetLength] = useState<number>(0);
  const [refreshDataGrid, setRefreshDataGrid] = useState(false);
  const [option, setOption] = useState<string>();
  const [dynamicContentLoading,setdynamicContentLoading] = useState(false);
  
  

  return (
    <>
      <GenericMessageModal />
      <Modal
        centered
        open={openAddStaffForm}
        footer={null}
        closable={true}
        onCancel={() => {
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
          getLength={getLength}
          refreshDataGrid={refreshDataGrid}
          setRefreshDataGrid={setRefreshDataGrid}
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
                { value: "All Staff", label: "All Staff" },
                { value: "Teaching Staff", label: "Teaching Staff" },
                { value: "Non Teaching Staff", label: "Non Teaching Staff" },
              ]}
              onSelect={(e:any)=>{
                setOption(e);
                setdynamicContentLoading(!dynamicContentLoading)
              }}
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
            setGetLength={setGetLength}
            refreshDataGrid={refreshDataGrid}
            setRefreshDataGrid={setRefreshDataGrid}
            option={option}
            dynamicContentLoading={dynamicContentLoading}
            setDynamicContentLoading={setdynamicContentLoading}
          />
        </section>
      </main>
    </>
  );
}


