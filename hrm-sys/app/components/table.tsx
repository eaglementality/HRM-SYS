"use client";
import React, { useRef, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import type { InputRef, TableColumnsType, TableColumnType } from "antd";
import { Button, Input, Space, Table, Tag } from "antd";
import type { FilterDropdownProps } from "antd/es/table/interface";
import Highlighter from "react-highlight-words";

interface DataType {
  key: string;
  name: string;
  tag: string;
  actions: string[];
}

type DataIndex = keyof DataType;

const data: DataType[] = [
  {
    key: "1",
    name: "John Brown",
    tag: "Teaching Staff",
    actions: ["Delete", "Edit", "View"],
  },
  {
    key: "2",
    name: "Joe Black",
    tag: "Non-Teaching Staff",
    actions: ["Delete", "Edit", "View"],
  },
  {
    key: "3",
    name: "Jim Green",
    tag: "Teaching Staff",
    actions: ["Delete", "Edit", "View"],
  },
  {
    key: "4",
    name: "Jim Red",
    tag: "Teaching Staff",
    actions: ["Delete", "Edit", "View"],
  },
  {
    key: "5",
    name: "Jim Red",
    tag: "Teaching Staff",
    actions: ["Delete", "Edit", "View"],
  },
  {
    key: "6",
    name: "Jim Red",
    tag: "Non-Teaching Staff",
    actions: ["Delete", "Edit", "View"],
  },
  {
    key: "7",
    name: "Jim Red",
    tag: "Non-Teaching Staff",
    actions: ["Delete", "Edit", "View"],
  },
  {
    key: "8",
    name: "Jim Red",
    tag: "Teaching Staff",
    actions: ["Delete", "Edit", "View"],
  },
  {
    key: "9",
    name: "Jim Red",
    tag: "Non-Teaching Staff",
    actions: ["Delete", "Edit", "View"],
  },
  {
    key: "10",
    name: "Jim Red",
    tag: "Non-Teaching Staff",
    actions: ["Delete", "Edit", "View"],
  },
  {
    key: "11",
    name: "Jim Red",
    tag: "Non-Teaching Staff",
    actions: ["Delete", "Edit", "View"],
  },
];

const Table_template: React.FC = () => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);

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
      dataIndex: "name",
      key: "name",
      width: "30%",
      ...getColumnSearchProps("name"),
    },
    {
      title: "Tags",
      key: "tags",
      dataIndex: "tags",
      render: (_, { tag }) => (
        <>
          <Tag
            className="text-md"
            color={tag === "Non-Teaching Staff" ? "red" : "green"}
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
      render: (_, { actions }) => (
        <>
          <div className="text-md space-x-8">
            {actions.map((action, id) => (
              <span
                key={id}
                className={`cursor-pointer ${
                  action == "Delete"
                    ? "font-bold text-red-600"
                    : action == "Edit"
                    ? "font-bold text-blue-600"
                    : "font-bold text-green-600"
                }`}
              >
                {action}
              </span>
            ))}
          </div>
        </>
      ),
    },
  ];
  // ['Delete','Edit', 'view']
  return (
    <Table columns={columns} dataSource={data} scroll={{ x: 0, y: 450 }} />
  );
};

export default Table_template;
// BC 674-14
