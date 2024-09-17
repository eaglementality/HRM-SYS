import { Button, Form, Input, Select } from "antd";
interface props {
  openAddStaffForm: boolean;
  setOpenAddStaffForm: (e: boolean) => void;
}
export const AddStaffForm = ({
  openAddStaffForm,
  setOpenAddStaffForm,
}: props) => {
  return (
    <Form className="flex flex-col justify-center p-5 py-8 ">
      <Form.Item label={<p>Full Name</p>}>
        <Input className="h-[45px]" />
      </Form.Item>
      <Form.Item label={<p>Category</p>}>
        <Select
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
          Add
        </Button>
      </div>
    </Form>
  );
};
