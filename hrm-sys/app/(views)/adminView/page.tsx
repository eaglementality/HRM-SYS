import Table_template from "@/app/components/table";
import { Select } from "antd";

export default async function AdminView() {
  return (
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
        <Select
          className="mb-5 h-[50px] w-[180px]"
          placeholder="select employee type"
          style={{ flex: 1 }}
          options={[
            { value: "teaching staff", label: "teaching staff" },
            { value: "Non-teaching staff", label: "Non-teaching staff" },
          ]}
        />
        <Table_template />
      </section>
    </main>
  );
}
