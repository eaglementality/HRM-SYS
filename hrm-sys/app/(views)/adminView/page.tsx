import Table_template from "@/app/components/table";

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
      <section className="px-5 pt-28 bg-pink-200">
        <Table_template/>
      </section>
    </main>
  );
}
