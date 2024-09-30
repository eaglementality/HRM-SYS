import { Button, Form, Input, Select } from "antd";
interface props {
  openAddStaffForm: boolean;
  setOpenAddStaffForm: (e: boolean) => void;
  switchContent?: { viewStaff: boolean; editStaff: boolean };
  selectedRecord?:{name:string, tag:string};
}
export const AddStaffForm = ({
  openAddStaffForm,
  setOpenAddStaffForm,
  switchContent,
  selectedRecord,
}: props) => {
  return (
    <>
      {switchContent?.viewStaff === false && (
        <Form className="flex flex-col justify-center p-5 py-8 ">
          <Form.Item label={<p>Full Name</p>}>
            <Input value={selectedRecord?.name} className="h-[45px]" />
          </Form.Item>
          <Form.Item label={<p>Category</p>}>
            <Select
              value={selectedRecord?.tag}
              className="h-[45px] w-52"
              placeholder="select employee type"
              options={[
                { value: "teaching staff", label: "teaching staff" },
                { value: "Non-teaching staff", label: "Non-teaching staff" },
              ]}
            />
          </Form.Item>
          <div className="flex flex-col mt-16">
            <Button
              onClick={() => {
                setOpenAddStaffForm(!openAddStaffForm);
              }}
              className="absolute right-[8%] h-10  w-28 bottom-4 font-medium bg-black text-white"
            >
              {switchContent?.editStaff === true ? 'Edit' : 'Add'}
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
