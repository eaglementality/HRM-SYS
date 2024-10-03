"use client";
import React, { useEffect, useRef, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import type { InputRef, TableColumnsType, TableColumnType } from "antd";
import { Button, Input, Modal, Space, Table, Tag } from "antd";
import type { FilterDropdownProps } from "antd/es/table/interface";
import Highlighter from "react-highlight-words";
import { GenericMessageModal } from "./GenericMessageModal";

interface Props {
  selectedRecord?: { name: string; tag: string };
  setSelectedRecord?: (e: any) => void;
  setSwitchContent?: (e: any) => void;
  switchContent?: { viewStaff: boolean; editStaff: boolean };
  openAddStaffForm: boolean;
  setOpenAddStaffForm: (e: boolean) => void;
  setGetLength?: (e: number) => void;
  refreshDataGrid?: boolean;
  setRefreshDataGrid?: (e: boolean) => void;
  option?: string;
  dynamicContentLoading?: boolean;
  setDynamicContentLoading?: (e: boolean) => void;
}
interface DataType {
  id: number;
  Name: string;
  tag: 'Teaching Staff'|'Non Teaching Staff';
  actions: string[];
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
type DataIndex = keyof DataType;

const Table_template = ({
  selectedRecord,
  setSelectedRecord,
  setSwitchContent,
  switchContent,
  openAddStaffForm,
  setOpenAddStaffForm,
  setGetLength,
  refreshDataGrid,
  setRefreshDataGrid,
  option,
  dynamicContentLoading,
  setDynamicContentLoading,
}: Props) => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);
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
  const handleSearch = (
    selectedKeys: string[],
    confirm: FilterDropdownProps["confirm"],
    dataIndex: DataIndex
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText("");
  };

  const handleDelete = (id: number) => {
    setMessageModalState((prev) => ({
      ...prev,
      icon: "Confirm",
      title: "Confirm",
      message: "Are you sure you want to delete the record ?",
      okText: "Yes delete",
      cancelText: "No",
      open: true,
      disableCancel: false,
      okHandler: async () => {
        await fetch(`/api/users/delete/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }).then(() => {
          setMessageModalState((prev) => ({ ...prev, open: false }));
          setRefreshDataGrid&&setRefreshDataGrid(!refreshDataGrid)
          setMessageModalState((prev) => ({
            ...prev,
            icon: "Success",
            title: "Success",
            message: "Record deleted successfully",
            okText: "Ok",
            open: true,
            disableCancel: true,
            okHandler: () => {
              setMessageModalState((prev) => ({ ...prev, open: false }));
            },
          }));
        }).catch(()=>{
          setMessageModalState((prev) => ({ ...prev, open: false }));
          setMessageModalState((prev) => ({
            ...prev,
            icon: "Warning",
            title: "Warning",
            message: "Record not deleted",
            okText: "Ok",
            open: true,
            disableCancel: true,
            okHandler: () => {
              setMessageModalState((prev) => ({ ...prev, open: false }));
            },
          }));
        })
      },
      cancelHandler: () => {
        setMessageModalState((prev) => ({ ...prev, open: false }));
      },
    }));
  };
  const handleEdit = (tag: string, name: string) => {
    setSelectedRecord &&
      setSelectedRecord((prev: typeof selectedRecord) => ({
        ...prev,
        name: name,
        tag: tag,
      }));
    setOpenAddStaffForm(!openAddStaffForm);
    setSwitchContent &&
      setSwitchContent((prev: typeof switchContent) => ({
        ...prev,
        editStaff: true,
        viewStaff: false,
      }));
  };
  const handleView = (tag: string, name: string) => {
    setOpenAddStaffForm(!openAddStaffForm);
    setSelectedRecord &&
      setSelectedRecord((prev: typeof selectedRecord) => ({
        ...prev,
        name: name,
        tag: tag,
      }));
    setSwitchContent &&
      setSwitchContent((prev: typeof switchContent) => ({
        ...prev,
        editStaff: false,
        viewStaff: true,
      }));
  };
  const getColumnSearchProps = (
    dataIndex: DataIndex
  ): TableColumnType<DataType> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() =>
              handleSearch(selectedKeys as string[], confirm, dataIndex)
            }
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText((selectedKeys as string[])[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const columns: TableColumnsType<DataType> = [
    {
      title: "Name",
      dataIndex: "Name",
      key: "Name",
      width: "30%",
      ...getColumnSearchProps("Name"),
    },
    {
      title: "Tags",
      key: "tags",
      dataIndex: "tags",
      render: (_, { tag }) => (
        <>
          <Tag
            className="text-md"
            color={tag === "Non Teaching Staff" ? "red" : "green"}
          >
            {tag}
          </Tag>
        </>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      dataIndex: "actions",
      render: (_, { actions, tag, Name, id }) => (
        <>
          <div className="text-md space-x-8">
            <span
              onClick={() => {
                handleDelete(id);
              }}
              className="cursor-pointer font-bold text-red-600"
            >
              {`Delete`}
            </span>
            <span
              onClick={() => {
                handleEdit(tag, Name);
              }}
              className="cursor-pointer font-bold text-blue-600"
            >
              {`Edit`}
            </span>
            <span
              onClick={() => {
                handleView(tag, Name);
              }}
              className="cursor-pointer font-bold text-green-600"
            >
              {`View`}
            </span>
          </div>
        </>
      ),
    },
  ];
  const [getStaff, setGetStaff] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dynamicContent, setDynamicContent] = useState([]);
  console.log("asd", dynamicContent);
  useEffect(() => {
    async function GetSpecificData() {
      const res = await fetch(`/api/users/${option}`);
      const data = res?.json();
      data.then((data) => {
        setDynamicContent(data);
      });
    }
    GetSpecificData();
  }, [dynamicContentLoading]);

  useEffect(() => {
    async function GetStaffData() {
      setLoading(true);
      const res = await fetch("/api/users");
      const data = res?.json();
      data.then((data) => {
        setGetStaff(data);
        setGetLength && setGetLength(data.length);
        setLoading(false);
      });
    }
    GetStaffData();
  }, [refreshDataGrid]);
  let Data =
    option == "Teaching Staff" || option == "Non Teaching Staff"
    ? dynamicContent
    : getStaff;
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
      <Table
        columns={columns}
        // dataSource={option == 'Teaching Staff' || option == 'Non Teaching Staff' ? getStaff : dynamicContent}
        dataSource={Data}
        scroll={{ x: 0, y: 450 }}
        loading={loading}
      />
    </>
  );
};

export default Table_template;
